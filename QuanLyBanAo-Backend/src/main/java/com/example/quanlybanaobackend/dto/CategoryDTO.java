package com.example.quanlybanaobackend.dto;

import lombok.Getter;
import lombok.Setter;
public class CategoryDTO {
    @Getter
    @Setter
    private int id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private Boolean isDeleted;

    public CategoryDTO(int id, String name, Boolean isDeleted) {
        this.id = id;
        this.name = name;
        this.isDeleted = isDeleted;
    }
}
