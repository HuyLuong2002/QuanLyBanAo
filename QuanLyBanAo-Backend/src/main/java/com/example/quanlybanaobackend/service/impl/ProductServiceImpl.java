package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.controller.AuthController;
import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.repository.ProductRepository;
import com.example.quanlybanaobackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;


    @Override
    public Page<Product> getProducts(Pageable pageable) {
        return productRepository.getAll(pageable);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(int id, Product product) {
        Product oldProduct = findById(id);
        oldProduct.setName(product.getName());
        oldProduct.setPrice(product.getPrice());
        oldProduct.setDescription(product.getDescription());
        oldProduct.setImage(product.getImage());
        oldProduct.setSize(product.getSize());
        oldProduct.setCategory(product.getCategory());
        oldProduct.setSupplier(product.getSupplier());
        oldProduct.setColor(product.getColor());
        oldProduct.setDeleted(product.isDeleted());
        return productRepository.save(oldProduct);

    }

    @Override
    public void deleteProduct(int id) {
        Product removeProduct = findById(id);
        removeProduct.setDeleted(true);
        productRepository.save(removeProduct);
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

    @Override
    public Page<Product> findByCategoryASC(Category category, Constant.Color color, String price, String keyword, Pageable pageable) {
        return productRepository.findByCategoryASC(category, color, price, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryDESC(Category category, Constant.Color color, String price, String keyword, Pageable pageable) {
        return productRepository.findByCategoryDESC(category, color, price, keyword, pageable);
    }
}
