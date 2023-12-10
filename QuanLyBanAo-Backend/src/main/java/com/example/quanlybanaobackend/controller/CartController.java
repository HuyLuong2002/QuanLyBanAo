package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.dto.OrderInformationRequest;
import com.example.quanlybanaobackend.dto.PayPalPayment;
import com.example.quanlybanaobackend.model.*;
import com.example.quanlybanaobackend.service.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private UserService userService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ProductService productService;

    @Autowired
    private AuthController authController;

    @Autowired
    private OrderService orderService;

    @Autowired
    private EmailController emailController;

    @Autowired
    PayPalService service;

    public static final String SUCCESS_URL = "/pay/success";
    public static final String CANCEL_URL = "/pay/cancel";

    @GetMapping(path = {"/getUserCart"})
    public ResponseEntity<Map<String, Object>> getUserCart() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() == null) {
            response.put("message", "Bạn chưa đăng nhập");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        ShoppingCart cart = user.getShoppingCart();
        response.put("success", true);
        response.put("cart", cart);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/reset")
    public ResponseEntity<Map<String, Object>> reset() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() == null) {
            response.put("message", "Bạn chưa đăng nhập");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findByUsername(username);
        ShoppingCart cart = user.getShoppingCart();
        shoppingCartService.deleteAllItem(cart);
        response.put("success", true);
        response.put("message", "Xóa thành công");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addItemToCart(
            @RequestParam("id") int productId,
            @RequestParam(value = "quantity", required = false, defaultValue = "1") int quantity) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            Product product = productService.findById(productId);
            if (product == null) {
                response.put("message", "Không tìm thấy sản phẩm");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            ShoppingCart cart = shoppingCartService.addItemToCart(product, quantity, user);
            response.put("success", true);
            response.put("cart", cart);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    @RequestMapping(value = "/update-cart", params = "action=update", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> updateCart(@RequestParam("quantity") int quantity,
                                                          @RequestParam("id") int productId) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            Product product = productService.findById(productId);
            ShoppingCart cart = shoppingCartService.updateItemInCart(product, quantity, user);
            cart.setCartItem(cart.getCartItem().stream()
                    .sorted(Comparator.comparing(CartItem::getId))
                    .collect(Collectors.toCollection(LinkedHashSet::new)));
            response.put("success", true);
            response.put("cart", cart);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/update-cart", params = "action=delete", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> deleteItemFromCart(@RequestParam("id") int productId) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            Product product = productService.findById(productId);
            if (product == null) {
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            ShoppingCart cart = shoppingCartService.deleteItemFromCart(product, user);
            response.put("success", true);
            response.put("cart", cart);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/check-out")
    public ResponseEntity<Map<String, Object>> checkout(@RequestBody OrderInformationRequest orderInformationRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            if (user.getTel().trim().isEmpty() || user.getAddress().trim().isEmpty()) {
                response.put("message", "Bạn chưa nhập số điện thoại và địa chỉ");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            } else {
                ShoppingCart cart = user.getShoppingCart();
                Order order = new Order();
                List<OrderDetail> orderDetailList = new ArrayList<>();
                order.setOrderDate(new Date());
                order.setTotalQuantity(cart.getTotalItems());
                order.setTotalPrice(cart.getTotalPrices() + order.getShippingFee());
                order.setOrderStatus(Constant.OrderStatus.ACTIVE);
                order.setShipStatus(Constant.ShipStatus.APPROVAL);
                order.setPaymentStatus(Constant.PaymentStatus.UNPAID);
                order.setNotes(orderInformationRequest.getNotes());
                order.setUser(user);
                if (orderInformationRequest.getPaymentMethod().name().equals("CASH")) {
                    order.setPaymentMethod(Constant.PaymentMethod.CASH);
                } else if (orderInformationRequest.getPaymentMethod().name().equals("BANKING")) {
                    order.setPaymentMethod(Constant.PaymentMethod.BANKING);
                }
                for (CartItem item :
                        cart.getCartItem()) {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrder(order);
                    orderDetail.setProduct(item.getProduct());
                    orderDetail.setQuantity(item.getQuantity());
                    orderDetail.setUnitPrice(item.getProduct().getPrice());
                    orderDetailList.add(orderDetail);
                }
                order.setOrderDetails(orderDetailList);

                orderService.save(order);
                shoppingCartService.delete(cart);
                response.put("success", true);
                response.put("message", "Đặt đơn hàng thành công");
                //Send mail to customer
                EmailDetails emailDetails = new EmailDetails();
                emailDetails.setRecipient(user.getEmail());
                emailDetails.setSubject("Thông báo đơn hàng");
                emailDetails.setMsgBody("Cảm ơn bạn đã đặt hàng ở công ty chúng tôi. " +
                        "Chúng tôi xin thông báo với bạn về đơn hàng của bạn đã đặt thành công");
                String result = emailController.sendMail(emailDetails);
                System.out.println(result);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/pay")
    public ResponseEntity<Map<String, Object>> payment(@RequestBody OrderInformationRequest orderInformationRequest) throws PayPalRESTException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            if (user.getTel().trim().isEmpty() || user.getAddress().trim().isEmpty()) {
                response.put("message", "Bạn chưa nhập số điện thoại và địa chỉ");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            } else {
                ShoppingCart cart = user.getShoppingCart();
                Order order = new Order();
                List<OrderDetail> orderDetailList = new ArrayList<>();
                order.setOrderDate(new Date());
                order.setTotalQuantity(cart.getTotalItems());
                order.setTotalPrice(cart.getTotalPrices() + order.getShippingFee());
                order.setOrderStatus(Constant.OrderStatus.ACTIVE);
                order.setShipStatus(Constant.ShipStatus.APPROVAL);
                order.setPaymentStatus(Constant.PaymentStatus.UNPAID);
                order.setNotes(orderInformationRequest.getNotes());
                order.setUser(user);
                if (orderInformationRequest.getPaymentMethod().name().equals("CASH")) {
                    order.setPaymentMethod(Constant.PaymentMethod.CASH);
                } else if (orderInformationRequest.getPaymentMethod().name().equals("BANKING")) {
                    order.setPaymentMethod(Constant.PaymentMethod.BANKING);
                }
                for (CartItem item :
                        cart.getCartItem()) {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrder(order);
                    orderDetail.setProduct(item.getProduct());
                    orderDetail.setQuantity(item.getQuantity());
                    orderDetail.setUnitPrice(item.getProduct().getPrice());
                    orderDetailList.add(orderDetail);
                }
                order.setOrderDetails(orderDetailList);
                Payment payment = service.createPayment(order.getTotalPrice(), "USD", "PAYPAL",
                        "ORDER", order.getNotes(), "http://localhost:3000/cart/",
                        "http://localhost:3000/cart");
                for (Links link : payment.getLinks()) {
                    if (link.getRel().equals("approval_url")) {
                        response.put("approval_link", link.getHref());
                    }
                }
                orderService.save(order);
                shoppingCartService.delete(cart);
                response.put("success", true);
                response.put("message", "Đặt đơn hàng thành công");
                //Send mail to customer
                EmailDetails emailDetails = new EmailDetails();
                emailDetails.setRecipient(user.getEmail());
                emailDetails.setSubject("Thông báo đơn hàng");
                emailDetails.setMsgBody("Cảm ơn bạn đã đặt hàng ở công ty chúng tôi. " +
                        "Chúng tôi xin thông báo với bạn về đơn hàng của bạn đã đặt thành công");
                String result = emailController.sendMail(emailDetails);
                System.out.println(result);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = CANCEL_URL)
    public ResponseEntity<Map<String, Object>> cancelPay() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Thanh toán thất bại");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = SUCCESS_URL)
    public ResponseEntity<Map<String, Object>> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", false);
            Payment payment = service.executePayment(paymentId, payerId);
            ObjectMapper objectMapper = new ObjectMapper();
            PayPalPayment paypalPayment = objectMapper.readValue(payment.toJSON(), PayPalPayment.class);
            if (payment.getState().equals("approved")) {
                response.put("success", true);
                response.put("response", paypalPayment);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
