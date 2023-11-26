package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    Page<Product> getProducts(Pageable pageable);

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

    Page<Product> findByCategoryASC(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable);

    Page<Product> findByCategoryASCGreaterThan(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable);
    Page<Product> findByCategoryASCGreaterThanOrEqual(Category category, Constant.Color color, int minPrice,String keyword, Pageable pageable);
    Page<Product> findByCategoryASCLessThan(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable);
    Page<Product> findByCategoryASCLessThanOrEqual(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable);
    Page<Product> findByCategoryASCBetween(Category category, Constant.Color color, int minPrice, int maxPrice, String keyword, Pageable pageable);

    Page<Product> findByCategoryDESC(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable);

    Page<Product> findByCategoryDESCGreaterThan(Category category, Constant.Color color, int minPrice, String keyword, Pageable pageable);
    Page<Product> findByCategoryDESCGreaterThanOrEqual(Category category, Constant.Color color, int minPrice,String keyword, Pageable pageable);
    Page<Product> findByCategoryDESCLessThan(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable);
    Page<Product> findByCategoryDESCLessThanOrEqual(Category category, Constant.Color color, int maxPrice, String keyword, Pageable pageable);
    Page<Product> findByCategoryDESCBetween(Category category, Constant.Color color, int minPrice, int maxPrice, String keyword, Pageable pageable);
    Page<Product> getProductsByPriceGreaterThan(int minPrice, Pageable pageable);

    Page<Product> getProductsByPriceGreaterThanOrEqual(int minPrice, Pageable pageable);

    Page<Product> getProductsByPriceLessThan(int maxPrice, Pageable pageable);

    Page<Product> getProductsByPriceLessThanOrEqual(int maxPrice, Pageable pageable);

    Page<Product> getProductsByPriceBetween(int minPrice, int maxPrice, Pageable pageable);
}
