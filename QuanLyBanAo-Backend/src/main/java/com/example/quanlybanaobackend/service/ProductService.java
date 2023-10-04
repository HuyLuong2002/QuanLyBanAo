package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts();
    Product save(Product product);
    Product findById(int id);

}
