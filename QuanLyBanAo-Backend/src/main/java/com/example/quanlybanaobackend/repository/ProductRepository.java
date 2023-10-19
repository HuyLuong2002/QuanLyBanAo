package com.example.quanlybanaobackend.repository;
import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p from Product p where p.color = :color")
    List<Product> findProductByColor(@Param("color") Constant.Color color);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(concat('%', :name, '%'))")
    List<Product> findProductByName(@Param("name") String name);

    //SELECT p FROM Product p WHERE p.price = (SELECT MAX(p2.price) FROM Product p2)
    //ORDER BY p.id ASC
    //LIMIT 1 -> lấy max 1 sản phẩm
    @Query("SELECT p FROM Product p WHERE p.price = (SELECT MAX(p2.price) FROM Product p2)")
    List<Product> findProductByMaxPrice();

    @Query("SELECT p FROM Product p WHERE p.price = (SELECT MIN(p2.price) FROM Product p2)")
    List<Product> findProductByMinPrice();

    @Query("SELECT p FROM Product p WHERE p.price < :price")
    List<Product> findProductUnderCertainPrice(@Param("price") String price);

    @Query("SELECT p FROM Product p WHERE p.price > :price")
    List<Product> findProductOverCertainPrice(@Param("price") String price);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :priceA AND :priceB")
    List<Product> findProductBetweenCertainPrice(@Param("priceA") String priceA, @Param("priceB") String priceB);
}
