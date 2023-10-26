package com.example.quanlybanaobackend.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String message = "Đăng nhập thành công";

    public AuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }
}
