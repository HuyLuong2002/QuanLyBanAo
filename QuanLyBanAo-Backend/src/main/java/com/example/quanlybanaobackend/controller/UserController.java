package com.example.quanlybanaobackend.controller;
import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Role;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.RoleRepository;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private final UserService userService;
    @Autowired
    private RoleRepository roleRepository;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if (userService.findByUsername(user.getEmail()) != null) {
            return new ResponseEntity<>("Tên tài khoản đã được đăng ký!", HttpStatus.BAD_REQUEST);
        }
        user.setStatus(Constant.UserStatus.ACTIVE);
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        user.setDeleted(false);
        Role roles = roleRepository.findByName(user.getRoles().stream().findFirst().get().getName()).get();
        user.setRoles(Collections.singletonList(roles));

        userService.createUser(user);
        return new ResponseEntity<>("Đăng ký thành công!", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @PutMapping("delete/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }
}