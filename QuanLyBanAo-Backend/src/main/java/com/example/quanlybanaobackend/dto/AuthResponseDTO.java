package com.example.quanlybanaobackend.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private boolean success;

    public AuthResponseDTO(String accessToken, boolean success) {
        this.accessToken = accessToken;
        this.success = success;
    }
}
