package com.example.quanlybanaobackend.dto;

import lombok.Getter;
import lombok.Setter;

public class ProductDTO {
    @Getter
    @Setter
    private int id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private double price;
    @Getter
    @Setter
    private String categoryName; // Thêm tên danh mục
    @Getter
    @Setter
    private String supplierName; // Thêm tên nhà cung cấp

    // Constructors, getters, and setters

    public ProductDTO(int id, String name, double price, String categoryName, String supplierName) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryName = categoryName;
        this.supplierName = supplierName;
    }



}
