package com.example.quanlybanaobackend.middleware;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.UserRepository;
import com.example.quanlybanaobackend.utils.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.quanlybanaobackend.common.jwtPayLoad;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
@Component
public class Auth extends OncePerRequestFilter implements HandlerInterceptor {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        String requestURI = request.getRequestURI();
        if (!requestURI.contains("/api/v1/users")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            if (token != null) {
                jwtPayLoad payload = jwtTokenProvider.getPayloadFromToken(token);
                User user = userRepository.findById(payload.getId()).get();

                if (user != null && user.getRole() == Constant.Role.ADMIN && user.getStatus() == Constant.UserStatus.ACTIVE) {
                    request.setAttribute("user", user);
                    filterChain.doFilter(request, response);
                } else {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
                }
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }
}
