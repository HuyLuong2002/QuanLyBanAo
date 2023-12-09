package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.dto.OrderDTO;
import com.example.quanlybanaobackend.dto.UserDTO;
import com.example.quanlybanaobackend.model.Order;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.OrderService;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthController authController;

    @GetMapping()
    public ResponseEntity<Map<String, Object>> getOrders() throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            List<OrderDTO> orderDTOS = new ArrayList<>();
            List<Order> orders = orderService.getOrders();
            for (Order order : orders) {
                orderDTOS.add(mapToDTO(order));
            }
            response.put("success", true);
            response.put("orders", orderDTOS);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    @GetMapping(path = {"/my-orders"})
    public ResponseEntity<Map<String, Object>> getUserOrders() throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        User user = null;
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            user = userService.findByUsername(username);
        }
        List<OrderDTO> orderDTOS = new ArrayList<>();
        List<Order> orders = orderService.findAllUserOrder(user);
        for (Order order : orders) {
            orderDTOS.add(mapToDTO(order));
        }
        response.put("success", true);
        response.put("orders", orderDTOS);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> getOrderById(@PathVariable int id) throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            response.put("success", true);
            response.put("order", mapToDTO(orderService.findById(id)));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @PutMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> updateOrders(@PathVariable int id, @RequestBody Order order) throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            if((order.getShipStatus() == Constant.ShipStatus.SHIPPING || order.getShipStatus() == Constant.ShipStatus.SHIPPED) && order.getOrderStatus() == Constant.OrderStatus.INACTIVE)
            {
                response.put("message", "Trạng thái hóa đơn đang là đã hủy không thể cập nhật tình trạng giao hàng là đang giao hoặc đã giao");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.put("success", true);
            response.put("order", mapToDTO(orderService.updateOrders(id, order)));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<Map<String, Object>> deleteOrders(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Order order = orderService.findById(id);

            if(order.getShipStatus() == Constant.ShipStatus.SHIPPING || order.getShipStatus() == Constant.ShipStatus.SHIPPED)
            {
                response.put("message", "Tình trạng giao hàng đang là đang giao hoặc đã giao, không thể hủy");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Order order1 =  orderService.deleteOrder(id);
            if(order1.getOrderStatus() == Constant.OrderStatus.INACTIVE)
            {
                response.put("success", true);
                response.put("message", "Xóa hóa đơn thành công");
            }
            else {
                response.put("success", true);
                response.put("message", "Khôi phục hóa đơn thành công");
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = {"/getOrderByDay"})
    public ResponseEntity<Map<String, Object>> getOrderByDay(@RequestParam String firstDate, @RequestParam String secondDate) throws ParseException {
        Map<String, Object> response = new HashMap<>();
        List<OrderDTO> orderDTOS = new ArrayList<>();
        List<Order> orders = orderService.getOrderByDay(firstDate, secondDate);
        for (Order order : orders) {
            orderDTOS.add(mapToDTO(order));
        }
        response.put("success", true);
        response.put("order", orderDTOS);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/getApprovalOrder"})
    public ResponseEntity<Map<String, Object>> getApprovalOrder() throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            List<OrderDTO> orderDTOS = new ArrayList<>();
            List<Order> orders = orderService.getApprovalOrder();
            for (Order order : orders) {
                orderDTOS.add(mapToDTO(order));
            }
            response.put("success", true);
            response.put("orders", orderDTOS);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @PutMapping(path = {"/approve/{id}"})
    public ResponseEntity<Map<String, Object>> approveOrder(@PathVariable int id) throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.put("success", true);
            response.put("order", mapToDTO(orderService.approveOrder(id, user)));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = {"/reject/{id}"})
    public ResponseEntity<Map<String, Object>> rejectOrder(@PathVariable int id) throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.put("success", true);
            response.put("order", mapToDTO(orderService.rejectOrder(id, user)));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = {"/exportExcel/{id}"})
    public ResponseEntity<Map<String, Object>> exportDataExcel(@PathVariable int id) throws IOException, ParseException, InterruptedException {
        String inputPath = "E:\\java-workspace\\QuanLyBanAo\\QuanLyBanAo-Backend\\src\\main\\resources\\excel\\OrderTemplate.xlsx";
        String outputPath = "E:\\java-workspace\\QuanLyBanAo\\QuanLyBanAo-Backend\\src\\main\\resources\\excel\\exportData\\";
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(orderService.exportDataExcel(id, inputPath, outputPath))
        {
            response.put("success", true);
            response.put("message", "Xuất file thành công");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Xuất file thất bại");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    public OrderDTO mapToDTO(Order order) throws ParseException {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setOrderDate(String.valueOf(order.getOrderDate()));
        orderDTO.setTotalQuantity(order.getTotalQuantity());
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setShippingFee(order.getShippingFee());
        orderDTO.setOrderStatus(order.getOrderStatus());
        orderDTO.setShipStatus(order.getShipStatus());
        orderDTO.setPaymentStatus(order.getPaymentStatus());
        orderDTO.setPaymentMethod(order.getPaymentMethod());
        orderDTO.setNotes(order.getNotes());
        orderDTO.setUser(mapToDTO(order.getUser()));
        if(order.getEmployee() == null)
        {
            orderDTO.setEmployee(null);
        }
        else orderDTO.setEmployee(mapToDTO(order.getEmployee()));
        orderDTO.setOrderDetails(order.getOrderDetails());
        return orderDTO;
    }
    public UserDTO mapToDTO(User user) throws ParseException {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setSex(user.getSex());
        userDTO.setDateOfBirth(String.valueOf(user.getDateOfBirth()));
        userDTO.setAddress(user.getAddress());
        userDTO.setTel(user.getTel());
        userDTO.setStatus(user.getStatus());
        userDTO.setCreatedAt(String.valueOf(user.getCreatedAt()));
        userDTO.setUpdatedAt(String.valueOf(user.getUpdatedAt()));
        userDTO.setRoles(user.getRoles());
        userDTO.setDeleted(user.isDeleted());
        return userDTO;
    }
}
