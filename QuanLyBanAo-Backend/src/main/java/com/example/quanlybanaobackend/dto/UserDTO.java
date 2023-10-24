package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.constant.Constant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
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

    private Constant.Role role;

    private Date createdAt;

    private Date updatedAt;

    private boolean isDeleted;

    public UserDTO(int id, String email, String lastName, String firstName, Constant.Gender sex, Date dateOfBirth, String address, String tel, Constant.UserStatus status, Constant.Role role, boolean isDeleted, Date createdAt, Date updatedAt) {
        this.id = id;
        this.email = email;
        this.lastName = lastName;
        this.firstName = firstName;
        this.sex = sex;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.tel = tel;
        this.status = status;
        this.role = role;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
