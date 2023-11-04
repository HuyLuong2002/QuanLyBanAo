package com.example.quanlybanaobackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierDTO {
    private int id;
    private String name;
    private Boolean isDeleted;

    public SupplierDTO(int id, String name, Boolean isDeleted) {
        this.id = id;
        this.name = name;
        this.isDeleted = isDeleted;
    }
}