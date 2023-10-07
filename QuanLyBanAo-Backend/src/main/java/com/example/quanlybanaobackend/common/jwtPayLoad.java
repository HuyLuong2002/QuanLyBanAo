package com.example.quanlybanaobackend.common;

import lombok.Getter;

import java.util.Date;

@Getter
public class jwtPayLoad {
    private Long id;
    private String email;

    public jwtPayLoad() {
    }

    public jwtPayLoad(Long id, String email) {
        this.id = id;
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
