package com.example.quanlybanaobackend.middleware;

import com.example.quanlybanaobackend.utils.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.quanlybanaobackend.common.jwtPayLoad;
import java.io.IOException;

public class Auth extends OncePerRequestFilter{

//    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            if (token != null) {
                jwtPayLoad payload = jwtTokenProvider.getPayloadFromToken(token);

                // ...

//                filterChain.doFilter(request, response);
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }



    private boolean checkUserRole(String hashedToken) {
        return true;
    }
}
