package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.common.jwtPayLoad;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.UserRepository;
import com.example.quanlybanaobackend.service.AuthService;
import com.example.quanlybanaobackend.utils.HandlePw;
import com.example.quanlybanaobackend.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public ResponseEntity<Map<String, Object>> register(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Username already exists");
            return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
        }

        String hashedPassword = HandlePw.hashPassword(user.getPassword());
        user.setPassword(hashedPassword);

        User newUser = userRepository.save(user);
        jwtPayLoad payload = new jwtPayLoad(newUser.getId(), newUser.getEmail());
        String token = jwtTokenProvider.generateToken(payload);

        newUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("user", newUser);
        response.put("token", token);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Map<String, Object>> login(String email, String password) {
        User foundUser = userRepository.findByEmail(email);
        if (foundUser == null || !HandlePw.checkPassword(password, foundUser.getPassword())) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email or password");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        jwtPayLoad payload = new jwtPayLoad(foundUser.getId(), foundUser.getEmail());
        String token = jwtTokenProvider.generateToken(payload);

        Map<String, Object> response = new HashMap<>();
        response.put("user", foundUser);
        response.put("token", token);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public void logout(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);

            jwtTokenProvider.invalidateToken(token);
        }
    }

    @Override
    public ResponseEntity<String> forgotPassword(String email) {
        User foundUser = userRepository.findByEmail(email);
        if (foundUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        jwtPayLoad payload = new jwtPayLoad(foundUser.getId(), foundUser.getEmail());
        String token = jwtTokenProvider.generateToken(payload);

        String resetPasswordUrl = "http://localhost:8000/api/v1/reset-password?token=" + token;

        try {
//            MimeMessage message = javaMailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//
//            helper.setFrom("admin@gmail.com");
//            helper.setTo(user.getEmail());
//            helper.setSubject("Reset Password");
//            helper.setText("Click the following link to reset your password: " + resetPasswordUrl);
//
//            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.ok("Reset password link has been sent to your email");
    }

    @Override
    public ResponseEntity<String> resetPassword(String token, String password) {
        jwtPayLoad payload = jwtTokenProvider.getPayloadFromToken(token);
        User foundUser = userRepository.findByEmail(payload.getEmail());
        if (foundUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        foundUser.setPassword(password);
        userRepository.save(foundUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
