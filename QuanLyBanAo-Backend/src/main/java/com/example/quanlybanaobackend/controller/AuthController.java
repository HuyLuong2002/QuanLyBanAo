package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.config.JWTGenerator;
import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.dto.AuthResponseDTO;
import com.example.quanlybanaobackend.dto.LoginDTO;
import com.example.quanlybanaobackend.dto.RegisterDTO;
import com.example.quanlybanaobackend.dto.UserDTO;
import com.example.quanlybanaobackend.model.Role;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.RoleRepository;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService,
                          RoleRepository roleRepository, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()));
            SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_GLOBAL);
            String token = jwtGenerator.generateToken(authentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            UserDTO userDTO = mapToDTO(userService.findByUsername(username));
            return new ResponseEntity<>(new AuthResponseDTO(token, true, userDTO), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new AuthResponseDTO(false, "Tài khoản hoặc mật khẩu không đúng"), HttpStatus.BAD_REQUEST);
        }


    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterDTO registerDto) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);

        if (userService.findByUsername(registerDto.getEmail()) != null) {
            response.put("message", "Tài khoản đã được đăng ký");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword());
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setSex(registerDto.getSex());
        user.setAddress(registerDto.getAddress());
        user.setDateOfBirth(registerDto.getDateOfBirth());
        user.setTel(registerDto.getTel());
        user.setStatus(Constant.UserStatus.ACTIVE);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setDeleted(false);


        Role roles = roleRepository.findByName("CUSTOMER").get();
        user.setRoles(Collections.singletonList(roles));
        userService.createUser(user);

        response.put("success", true);
        response.put("user", user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        String username = getUserLogin();
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (username == null) {
            response.put("message", "Bạn chưa đăng nhập");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        User user = userService.findByUsername(username);
        response.put("success", true);
        response.put("user", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody User userUpdate) {
        String username = getUserLogin();
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (username == null) {
            response.put("message", "Bạn chưa đăng nhập");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        User currentUser = userService.findByUsername(username);
        User user = userService.updateUserProfile(currentUser.getId(), userUpdate);
        response.put("success", true);
        response.put("user", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        Map<String, Object> response = new HashMap<>();
        SecurityContextHolder.getContext().setAuthentication(null);

        response.put("success", true);
        response.put("user", null);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public boolean checkUserLogin() {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return false;
        }
        return true;
    }

    public String getUserLogin() {
        if (checkUserLogin()) {
            return SecurityContextHolder.getContext().getAuthentication().getName();
        }
        return null;
    }

    public UserDTO mapToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setSex(user.getSex());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setAddress(user.getAddress());
        userDTO.setTel(user.getTel());
        userDTO.setStatus(user.getStatus());
        userDTO.setUpdatedAt(new Date());
        userDTO.setRoles(user.getRoles());
        userDTO.setDeleted(user.isDeleted());
        return userDTO;
    }

}
