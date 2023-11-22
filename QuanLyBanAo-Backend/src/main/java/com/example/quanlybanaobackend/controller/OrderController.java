package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
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
    public ResponseEntity<Map<String, Object>> getOrders() {
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
            response.put("orders", orderService.getOrders());
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    @GetMapping(path = {"/my-orders"})
    public ResponseEntity<Map<String, Object>> getUserOrders() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        User user = null;
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            user = userService.findByUsername(username);
        }
        response.put("success", true);
        response.put("order", orderService.findAllUserOrder(user));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> getOrderById(@PathVariable int id) {
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
            response.put("order", orderService.findById(id));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @PutMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> updateOrders(@PathVariable int id, @RequestBody Order order) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            if((order.getShipStatus() == Constant.ShipStatus.SHIPPING || order.getShipStatus() == Constant.ShipStatus.SHIPPED) && order.getOrderStatus() == Constant.OrderStatus.UNACTIVE)
            {
                response.put("message", "Trạng thái hóa đơn đang là đã hủy không thể cập nhật tình trạng giao hàng là đang giao hoặc đã giao");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.put("success", true);
            response.put("order", orderService.updateOrders(id, order));
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
            if(order == null)
            {
                response.put("message", "Hóa đơn không tồn tại");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            if(order.getShipStatus() == Constant.ShipStatus.SHIPPING || order.getShipStatus() == Constant.ShipStatus.SHIPPED)
            {
                response.put("message", "Tình trạng giao hàng đang là đang giao hoặc đã giao, không thể hủy");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            orderService.deleteOrder(id);
            response.put("success", true);
            response.put("message", "Xóa hóa đơn thành công");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = {"/getOrderByDay"})
    public ResponseEntity<Map<String, Object>> getOrderByDay(@RequestParam String firstDate, @RequestParam String secondDate) throws ParseException {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("order", orderService.getOrderByDay(firstDate, secondDate));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/getApprovalOrder"})
    public ResponseEntity<Map<String, Object>> getApprovalOrder()
    {
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
            response.put("order", orderService.getApprovalOrder());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @PutMapping(path = {"/approve/{id}"})
    public ResponseEntity<Map<String, Object>> approveOrder(@PathVariable int id)
    {
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
            response.put("order", orderService.approveOrder(id));
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
}
