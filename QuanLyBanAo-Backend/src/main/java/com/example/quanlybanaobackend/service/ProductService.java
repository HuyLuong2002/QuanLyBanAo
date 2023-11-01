package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts();
    Product save(Product product);

    Product updateProduct(int id, Product product);

    void deleteProduct(int id);

    Product findById(int id);

    List<Product> findByColor(Constant.Color color);

    List<Product> findByName(String name);

    List<Product> findByMaxPrice();

    List<Product> findByMinPrice();

    List<Product> findUnderCertainPrice(String price);

    List<Product> findOverCertainPrice(String price);

    List<Product> findBetweenCertainPrice(String priceA, String priceB);
}
