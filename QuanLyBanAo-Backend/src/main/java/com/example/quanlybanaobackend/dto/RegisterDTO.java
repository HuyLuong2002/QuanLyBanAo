package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.constant.Constant;
import lombok.Data;

import java.util.Date;

@Data
public class RegisterDTO {
    private String email;
    private String password;
    private String lastName;

    private String firstName;

    private Constant.Gender sex;

    private Date dateOfBirth;

    private String address;

    private String tel;

}
