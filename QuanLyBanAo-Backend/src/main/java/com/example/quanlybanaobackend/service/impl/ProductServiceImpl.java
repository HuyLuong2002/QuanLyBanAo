package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.dto.ProductDTO;
import com.example.quanlybanaobackend.model.Color;
import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.repository.ProductRepository;
import com.example.quanlybanaobackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Override
    public List<Product> getProducts() {
       return productRepository.findAll();
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product findById(int id) {
        boolean isPresent = productRepository.findById(id).isPresent();
        if(isPresent)
        {
            return productRepository.findById(id).get();
        }
        else return null;

    }

    @Override
    public List<Product> findByColor(Color color) {
        if(color.name().isEmpty())
        {
            return null;
        }
        else {
            return productRepository.findProductByColor(color);
        }

    }

    @Override
    public List<Product> findByName(String name) {
        if(name.isEmpty())
        {
            return null;
        }
        else {
            return productRepository.findProductByName(name);
        }
    }

    @Override
    public List<Product> findByMaxPrice() {
        return productRepository.findProductByMaxPrice();
    }

    @Override
    public List<Product> findByMinPrice() {
        return productRepository.findProductByMinPrice();
    }

}
