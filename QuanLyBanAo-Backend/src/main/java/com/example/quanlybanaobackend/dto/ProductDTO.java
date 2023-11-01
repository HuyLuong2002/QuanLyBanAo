package com.example.quanlybanaobackend.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ProductDTO {

    private int id;
    private String name;
    private double price;
    private String categoryName;
    private String supplierName;

    // Constructors, getters, and setters

    public ProductDTO(int id, String name, double price, String categoryName, String supplierName) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryName = categoryName;
        this.supplierName = supplierName;
    }



}
