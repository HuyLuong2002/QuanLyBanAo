package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.ShoppingCart;

public interface ShoppingCartService {

    ShoppingCart save(ShoppingCart shoppingCart);
    ShoppingCart findUserShoppingCart(String username);
}
