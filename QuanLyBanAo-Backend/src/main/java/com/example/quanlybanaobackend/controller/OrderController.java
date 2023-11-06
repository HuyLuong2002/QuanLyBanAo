package com.example.quanlybanaobackend.controller;

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
import java.util.List;

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
    public List<Order> getOrders() {
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return null;
            }
            return orderService.getOrders();
        }
        return null;
    }


    @GetMapping(path = {"/my-orders"})
    public List<Order> getUserOrders() {
        User user = null;
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            user = userService.findByUsername(username);
        }
        return orderService.findAllUserOrder(user);
    }

    @GetMapping(path = {"/{id}"})
    public Order getOrderById(@PathVariable int id) {
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return null;
            }
            return orderService.findById(id);
        }
        return null;

    }

    @PutMapping(path = {"/{id}"})
    public Order updateOrders(@PathVariable int id, @RequestBody Order order) {
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return null;
            }
            return orderService.updateOrders(id, order);
        }
        return null;

    }

    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<String> deleteOrders(@PathVariable int id) {
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return null;
            }
            orderService.deleteOrder(id);
            return ResponseEntity.status(HttpStatus.CREATED).body("Xóa hóa đơn thành công.");
        }
        return null;
    }

    @GetMapping(path = {"/getOrderByDay"})
    public List<Order> getOrderByDay(@RequestParam String firstDate, @RequestParam String secondDate) throws ParseException {
        return orderService.getOrderByDay(firstDate, secondDate);
    }

    @GetMapping(path = {"/getApprovalOrder"})
    public List<Order> getApprovalOrder()
    {
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return null;
            }
            return orderService.getApprovalOrder();
        }
        return null;

    }

    @PutMapping(path = {"/approve/{id}"})
    public Order approveOrder(@PathVariable int id)
    {
        if(authController.getUserLogin() != null)
        {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return null;
            }
            return orderService.approveOrder(id);
        }
        return null;

    }

    @GetMapping(path = {"/exportExcel/{id}"})
    public ResponseEntity<String> exportDataExcel(@PathVariable int id) throws IOException, ParseException, InterruptedException {
        String inputPath = "E:\\java-workspace\\QuanLyBanAo\\QuanLyBanAo-Backend\\src\\main\\resources\\excel\\OrderTemplate.xlsx";
        String outputPath = "E:\\java-workspace\\QuanLyBanAo\\QuanLyBanAo-Backend\\src\\main\\resources\\excel\\exportData\\";
        
        if(orderService.exportDataExcel(id, inputPath, outputPath))
        {
            return ResponseEntity.status(HttpStatus.OK).body("Xuất file thành công");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xuất file thất bại");
    }
}
