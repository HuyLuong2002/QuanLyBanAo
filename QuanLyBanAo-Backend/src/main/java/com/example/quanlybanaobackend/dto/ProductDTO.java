package com.example.quanlybanaobackend.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ProductDTO {

    private int id;
    private String name;
    private double price;
    private String categoryName; // Thêm tên danh mục
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
