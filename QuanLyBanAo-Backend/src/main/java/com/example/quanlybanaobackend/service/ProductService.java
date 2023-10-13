package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.Color;
import com.example.quanlybanaobackend.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts();
    Product save(Product product);
    Product findById(int id);

    List<Product> findByColor(Color color);

    List<Product> findByName(String name);

    List<Product> findByMaxPrice();

    List<Product> findByMinPrice();
}
