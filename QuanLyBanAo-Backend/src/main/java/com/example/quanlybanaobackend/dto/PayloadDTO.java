package com.example.quanlybanaobackend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
public class PayloadDTO implements Serializable {
    private MultipartFile file;
}
