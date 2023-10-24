package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.LoginData;
import com.example.quanlybanaobackend.model.User;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.InvocationTargetException;
import java.util.Map;

public interface AuthService {

    ResponseEntity<Map<String, Object>> register(User user);

    ResponseEntity<Map<String, Object>> login(LoginData loginData) throws InvocationTargetException, IllegalAccessException;

    void logout(String token);

    ResponseEntity<String> forgotPassword(String email);

    ResponseEntity<String> resetPassword(String token, String password);
}
