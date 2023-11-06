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
import java.util.List;

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
    public List<User> getAllUsers() {
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                return null;
            }
            return userService.getAllUsers();
        }
        return null;

    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                return null;
            }
            return userService.getUserById(id);
        }
        return null;

    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn không có quyền thực hiện chức năng này");
            }
            if (userService.findByUsername(user.getEmail()) != null) {
                return new ResponseEntity<>("Tên tài khoản đã được đăng ký!", HttpStatus.BAD_REQUEST);
            }
            userService.createUser(user);
            return new ResponseEntity<>("Đăng ký thành công!", HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn chưa đăng nhập!");
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("CUSTOMER") || userAdmin.getRoles().stream().findFirst().get().getName().equals("EMPLOYEE")) {
                return null;
            }
            return userService.updateUser(id, user);
        }
        return null;

    }

    @PutMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        if (authController.getUserLogin() != null) {
            User userAdmin = userService.findByUsername(authController.getUserLogin());
            if (userAdmin.getRoles().stream().findFirst().get().getName().equals("ADMIN")) {
                userService.deleteUser(id);
            }
        }
    }
}