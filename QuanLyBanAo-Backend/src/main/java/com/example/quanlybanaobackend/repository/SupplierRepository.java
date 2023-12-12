package com.example.quanlybanaobackend.repository;

import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
    @Query("SELECT s FROM Supplier s ")
    List<Supplier> getAll();
}