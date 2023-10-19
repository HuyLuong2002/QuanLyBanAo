package com.example.quanlybanaobackend.common;

import lombok.Getter;

import java.util.Date;

@Getter
public class jwtPayLoad {
    private int id;
    private String email;

    public jwtPayLoad() {
    }

    public jwtPayLoad(int id, String email) {
        this.id = id;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
