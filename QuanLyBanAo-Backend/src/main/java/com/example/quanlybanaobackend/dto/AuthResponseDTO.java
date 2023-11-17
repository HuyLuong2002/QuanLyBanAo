package com.example.quanlybanaobackend.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private boolean success;
    private UserDTO userDTO;

    public AuthResponseDTO(String accessToken, boolean success, UserDTO userDTO) {
        this.accessToken = accessToken;
        this.success = success;
        this.userDTO = userDTO;
    }
}
