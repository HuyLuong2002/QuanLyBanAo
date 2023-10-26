package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.constant.Constant;
import lombok.Data;

import java.util.Date;

@Data
public class RegisterDTO {
    private int id;
    private String email;
    private String password;
    private String lastName;

    private String firstName;

    private Constant.Gender sex;

    private Date dateOfBirth;

    private String address;

    private String tel;

    private Constant.UserStatus status;

    private Date createdAt;

    private Date updatedAt;

    private boolean isDeleted;

    public RegisterDTO(int id, String email, String lastName, String firstName, Constant.Gender sex, Date dateOfBirth, String address, String tel, Constant.UserStatus status, boolean isDeleted, Date createdAt, Date updatedAt) {
        this.id = id;
        this.email = email;
        this.lastName = lastName;
        this.firstName = firstName;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.tel = tel;
        this.status = status;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
