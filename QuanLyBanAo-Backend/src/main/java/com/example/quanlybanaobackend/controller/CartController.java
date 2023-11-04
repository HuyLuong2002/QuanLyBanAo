package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.*;
import com.example.quanlybanaobackend.service.OrderService;
import com.example.quanlybanaobackend.service.ProductService;
import com.example.quanlybanaobackend.service.ShoppingCartService;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


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


    @PostMapping("/add")
    public ResponseEntity<String> addItemToCart(
            @RequestParam("id") int productId,
            @RequestParam(value = "quantity", required = false, defaultValue = "1") int quantity) {
        if(authController.getUserLogin() != null)
        {
            Product product = productService.findById(productId);
            if(product == null)
            {
                return new ResponseEntity<>("Sản phẩm không tồn tại", HttpStatus.BAD_REQUEST);
            }
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            ShoppingCart cart = shoppingCartService.addItemToCart(product, quantity, user);

            return new ResponseEntity<>("Thêm sản phẩm vào giỏ hàng thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Bạn chưa đăng nhập!", HttpStatus.BAD_REQUEST);
    }


    @RequestMapping(value = "/update-cart", params = "action=update", method = RequestMethod.POST)
    public ResponseEntity<String> updateCart(@RequestParam("quantity") int quantity,
                             @RequestParam("id") int productId) {
        if(authController.getUserLogin() != null)
        {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            Product product = productService.findById(productId);
            ShoppingCart cart = shoppingCartService.updateItemInCart(product, quantity, user);

            return new ResponseEntity<>("Thêm sản phẩm vào giỏ hàng thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Bạn chưa đăng nhập!", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/update-cart", params = "action=delete", method = RequestMethod.POST)
    public ResponseEntity<String> deleteItemFromCart(@RequestParam("id") int productId) {
        if(authController.getUserLogin() != null)
        {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            Product product = productService.findById(productId);
            if(product == null)
            {
                return new ResponseEntity<>("Sản phẩm không tồn tại", HttpStatus.BAD_REQUEST);
            }
            ShoppingCart cart = shoppingCartService.deleteItemFromCart(product, user);


            return new ResponseEntity<>("Xóa sản phẩm vào giỏ hàng thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Bạn chưa đăng nhập!", HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/check-out")
    public ResponseEntity<String> checkout(@RequestParam String paymentMethod, @RequestParam String notes){
        if(authController.getUserLogin() != null) {

            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            if (user.getTel().trim().isEmpty() || user.getAddress().trim().isEmpty()) {

                return new ResponseEntity<>("Yêu cầu điên đầy đủ thông tin cho đơn hàng!", HttpStatus.BAD_REQUEST);
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
                order.setNotes(notes);
                order.setUser(user);
                if(paymentMethod.equals("Cash")){
                    order.setPaymentMethod(Constant.PaymentMethod.CASH);
                }
                else if(paymentMethod.equals("Banking")){
                    order.setPaymentMethod(Constant.PaymentMethod.BANKING);
                }
                for (CartItem item :
                        cart.getCartItem()) {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrder(order);
                    orderDetail.setProduct(item.getProduct());
                    orderDetail.setQuantity(item.getQuantity());
                    orderDetail.setUnitPrice(item.getTotalPrice());
                    orderDetailList.add(orderDetail);
                }
                order.setOrderDetails(orderDetailList);

                orderService.save(order);
                shoppingCartService.delete(cart);
            }
            return new ResponseEntity<>("Đặt đơn hàng thành công!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Bạn chưa đăng nhập!", HttpStatus.BAD_REQUEST);
    }


}
