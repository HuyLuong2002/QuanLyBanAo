package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
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

    private Date createdAt;

    private Date updatedAt;

    private boolean isDeleted;

    private Collection<Role> roles;
}
