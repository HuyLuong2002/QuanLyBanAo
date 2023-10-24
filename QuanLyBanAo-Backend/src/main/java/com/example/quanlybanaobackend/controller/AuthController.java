package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.LoginData;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginData loginData) throws InvocationTargetException, IllegalAccessException {
        return authService.login(loginData);
    }

    @PostMapping("/logout")
    public boolean logout(@RequestHeader("Authorization") String token) {
        authService.logout(token);
        return true;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        return authService.forgotPassword(email);
    }

    @GetMapping("/reset-password/{token}")
    public ResponseEntity<String> resetPassword(@PathVariable String token, @RequestParam String password) {
        return authService.resetPassword(token, password);
    }
}