package com.example.quanlybanaobackend.repository;
import com.example.quanlybanaobackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT new com.example.quanlybanaobackend.model.Product(p.id, p.name, p.quantity, p.price, p.description, p.image, p.size, c, s, p.color, p.isDeleted) " +
            "FROM Product p " +
            "JOIN p.category c " +
            "JOIN p.supplier s")
    List<Product> findAll();
}
