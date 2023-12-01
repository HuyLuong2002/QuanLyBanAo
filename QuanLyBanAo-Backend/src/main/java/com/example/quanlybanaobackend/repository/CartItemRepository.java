package com.example.quanlybanaobackend.repository;

import com.example.quanlybanaobackend.model.CartItem;
import com.example.quanlybanaobackend.model.ShoppingCart;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

    @Transactional
    void deleteCartItemsByCart(ShoppingCart shoppingCart);
}
