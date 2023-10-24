package com.example.quanlybanaobackend.repository;

import com.example.quanlybanaobackend.model.ShoppingCart;
import com.example.quanlybanaobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Integer> {

    @Query("select sp from ShoppingCart sp where sp.user.email = :username")
    ShoppingCart findShoppingCartByUsername(@Param("username") String username);
}
