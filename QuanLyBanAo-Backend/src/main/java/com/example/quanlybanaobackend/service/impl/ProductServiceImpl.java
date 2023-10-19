package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.repository.ProductRepository;
import com.example.quanlybanaobackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
        if (isPresent) {
            return productRepository.findById(id).get();
        } else return null;

    }

    @Override
    public List<Product> findByColor(Constant.Color color) {
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

    @Override
    public List<Product> findUnderCertainPrice(String price){
        return productRepository.findProductUnderCertainPrice(price);
    }

    @Override
    public List<Product> findOverCertainPrice(String price){
        return productRepository.findProductOverCertainPrice(price);
    }

    @Override
    public List<Product> findBetweenCertainPrice(String priceA, String priceB){
        return productRepository.findProductBetweenCertainPrice(priceA, priceB);
    }
}
