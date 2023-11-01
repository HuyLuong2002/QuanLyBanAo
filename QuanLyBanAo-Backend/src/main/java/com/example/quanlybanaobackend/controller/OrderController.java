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
        return orderService.getOrders();
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
        return orderService.findById(id);
    }

    @PutMapping(path = {"/{id}"})
    public Order updateOrders(@PathVariable int id, @RequestBody Order order) {
        return orderService.updateOrders(id, order);
    }

    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<String> deleteOrders(@PathVariable int id) {
        orderService.deleteOrder(id);
        return ResponseEntity.status(HttpStatus.CREATED).body("Xóa hóa đơn thành công.");
    }
}
