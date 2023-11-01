package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.config.JWTGenerator;
import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.dto.AuthResponseDTO;
import com.example.quanlybanaobackend.dto.LoginDTO;
import com.example.quanlybanaobackend.dto.RegisterDTO;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

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
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
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
            return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Tài khoản hoặc mật khẩu không đúng", HttpStatus.BAD_REQUEST);
        }


    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDto) {
        if (userService.findByUsername(registerDto.getEmail()) != null) {
            return new ResponseEntity<>("Tên tài khoản đã được đăng ký!", HttpStatus.BAD_REQUEST);
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
        user.setCreatedAt(registerDto.getCreatedAt());
        user.setUpdatedAt(registerDto.getUpdatedAt());
        user.setDeleted(false);


        Role roles = roleRepository.findByName("CUSTOMER").get();
        user.setRoles(Collections.singletonList(roles));
        userService.createUser(user);

        return new ResponseEntity<>("Đăng ký thành công", HttpStatus.OK);
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
}
