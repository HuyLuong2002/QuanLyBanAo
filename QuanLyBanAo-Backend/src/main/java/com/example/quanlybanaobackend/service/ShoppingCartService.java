package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.model.ShoppingCart;
import com.example.quanlybanaobackend.model.User;

public interface ShoppingCartService {

    ShoppingCart addItemToCart(Product product, int quantity, User user);

    ShoppingCart updateItemInCart(Product product, int quantity, User user);

    ShoppingCart deleteItemFromCart(Product product, User user);

    void deleteAllItem(ShoppingCart shoppingCart);
    void delete(ShoppingCart shoppingCart);
}
