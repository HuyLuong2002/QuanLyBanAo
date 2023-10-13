package com.example.quanlybanaobackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierDTO {
    private int id;
    private String name;


    public SupplierDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }
}