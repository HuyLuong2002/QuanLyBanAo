package com.example.quanlybanaobackend.utils;

import com.example.quanlybanaobackend.common.jwtPayLoad;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long defaultExpirationInSeconds;

    public String generateToken(jwtPayLoad payload, Long expiration) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + (expiration * 1000));

        return Jwts.builder()
                .claim("id", payload.getId())
                .claim("username", payload.getEmail())
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String generateToken(jwtPayLoad payload) {
        return generateToken(payload, defaultExpirationInSeconds);
    }

    public jwtPayLoad getPayloadFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

        Long id = claims.get("id", Long.class);
        String username = claims.get("username", String.class);

        return new jwtPayLoad(id, username);
    }

    public Boolean validateToken(String token, jwtPayLoad payload) {
        jwtPayLoad tokenPayload = getPayloadFromToken(token);
        return tokenPayload.equals(payload) && !isTokenExpired(token);
    }

    public void invalidateToken(String token) {
        Date now = new Date();
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        claims.setExpiration(now);
    }

    private Boolean isTokenExpired(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();

        Date expirationDate = claims.getExpiration();
        Date now = new Date();
        return expirationDate.before(now);
    }
}
