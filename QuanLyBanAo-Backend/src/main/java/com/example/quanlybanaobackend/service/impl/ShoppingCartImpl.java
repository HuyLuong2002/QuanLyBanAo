package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.model.ShoppingCart;
import com.example.quanlybanaobackend.repository.ProductRepository;
import com.example.quanlybanaobackend.repository.ShoppingCartRepository;
import com.example.quanlybanaobackend.repository.UserRepository;
import com.example.quanlybanaobackend.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartImpl implements ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Override
    public ShoppingCart save(ShoppingCart shoppingCart) {
        return shoppingCartRepository.save(shoppingCart);
    }

    @Override
    public ShoppingCart findUserShoppingCart(String username) {
        return shoppingCartRepository.findShoppingCartByUsername(username);
    }
}
