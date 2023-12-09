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
    public List<Product> getProductsByCategory(int categoryId) {
        return productRepository.getProductsByCategory_Id(categoryId);
    }

    @Override
    public List<Product> getRelatedProducts(int categoryId, int productId) {
        return productRepository.getRelatedProduct(categoryId, productId);
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
    public Product deleteProduct(int id) {
        Product removeProduct = findById(id);
        removeProduct.setDeleted(!removeProduct.isDeleted());
        return productRepository.save(removeProduct);
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
    public Page<Product> findByCategoryASC(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryASC(category, color, minPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryASCGreaterThan(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryASCGreaterThan(category, color, minPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryASCGreaterThanOrEqual(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryASCGreaterThanOrEqual(category, color, minPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryASCLessThan(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryASCLessThan(category, color, maxPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryASCLessThanOrEqual(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryASCLessThanOrEqual(category, color, maxPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryASCBetween(Category category, Constant.Color color, int minPrice, int maxPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryASCBetween(category, color, minPrice, maxPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryDESC(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryDESC(category, color, minPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryDESCGreaterThan(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryDESCGreaterThan(category, color, minPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryDESCGreaterThanOrEqual(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryDESCGreaterThanOrEqual(category, color, minPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryDESCLessThan(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryDESCLessThan(category, color, maxPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryDESCLessThanOrEqual(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryDESCLessThanOrEqual(category, color, maxPrice, keyword, pageable);
    }

    @Override
    public Page<Product> findByCategoryDESCBetween(Category category, Constant.Color color, int minPrice, int maxPrice, String keyword, Pageable pageable) {
        return productRepository.findByCategoryDESCBetween(category, color, minPrice, maxPrice, keyword, pageable);
    }

    @Override
    public Page<Product> getProductsByPriceGreaterThan(int minPrice, Pageable pageable) {
        return productRepository.findByPriceGreaterThan(minPrice, pageable);
    }

    @Override
    public Page<Product> getProductsByPriceGreaterThanOrEqual(int minPrice, Pageable pageable) {
        return productRepository.findByPriceGreaterThanEqual(minPrice, pageable);
    }

    @Override
    public Page<Product> getProductsByPriceLessThan(int maxPrice, Pageable pageable) {
        return productRepository.findByPriceLessThan(maxPrice, pageable);
    }

    @Override
    public Page<Product> getProductsByPriceLessThanOrEqual(int maxPrice, Pageable pageable) {
        return productRepository.findByPriceLessThanEqual(maxPrice, pageable);
    }

    @Override
    public Page<Product> getProductsByPriceBetween(int minPrice, int maxPrice, Pageable pageable) {
        return productRepository.findByPriceBetween(minPrice, maxPrice, pageable);
    }
}
