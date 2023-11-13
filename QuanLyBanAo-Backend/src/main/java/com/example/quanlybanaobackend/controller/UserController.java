package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.dto.UserDTO;
import com.example.quanlybanaobackend.model.Role;
import com.example.quanlybanaobackend.model.Supplier;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.RoleRepository;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private final UserService userService;
    @Autowired
    private AuthController authController;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.put("success", true);
            response.put("users", userService.getAllUsers());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.put("success", true);
            response.put("user", userService.getUserById(id));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            if (userService.findByUsername(user.getEmail()) != null) {
                response.put("message", "Tên tài khoản đã được đăng ký");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            userService.createUser(user);

            response.put("success", true);
            response.put("message", "Đăng ký thành công");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable int id, @RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            response.put("success", true);
            response.put("user", userService.updateUser(id, user));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("ADMIN")) {
                userService.deleteUser(id);
                response.put("success", true);
                response.put("message", "Xóa người dùng thành công");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}