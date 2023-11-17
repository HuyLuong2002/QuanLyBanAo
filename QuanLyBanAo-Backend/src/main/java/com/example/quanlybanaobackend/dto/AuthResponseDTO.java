package com.example.quanlybanaobackend.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private boolean success;
    private UserDTO user;
    private String message;

    public AuthResponseDTO(String accessToken, boolean success, UserDTO userDTO) {
        this.accessToken = accessToken;
        this.success = success;
        this.user = userDTO;
    }

    public AuthResponseDTO(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
