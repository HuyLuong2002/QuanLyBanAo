package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.CartItem;
import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.model.ShoppingCart;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.ShoppingCartService;
import com.example.quanlybanaobackend.service.UserService;
import com.example.quanlybanaobackend.utils.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private UserService userService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    private Set<CartItem> cartItems;
    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody Product product) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication);
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            System.out.println(username);
            // Lấy thông tin người dùng từ username, ví dụ sử dụng UserService
            User user = userService.findByUsername(username);
            // Tiếp theo, tạo hoặc cập nhật giỏ hàng
            ShoppingCart shoppingCart = shoppingCartService.findUserShoppingCart(user.getEmail());
            if (shoppingCart == null) {
                shoppingCart = new ShoppingCart();
                shoppingCart.setUser(user);
            }
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(1);
            cartItem.setTotalPrice(product.getPrice());
            cartItem.setCart(shoppingCart);

            this.cartItems.add(cartItem);
            shoppingCart.setTotalItems(cartItems.size());
            shoppingCart.setTotalPrices(cartItems.stream().mapToDouble(CartItem::getTotalPrice).sum());
            shoppingCart.setCartItem(cartItems);

            // Lưu trữ giỏ hàng
            shoppingCartService.save(shoppingCart);
            return new ResponseEntity<>("Product added to cart successfully", HttpStatus.OK);
        }
            return new ResponseEntity<>("Invalid product or quantity", HttpStatus.BAD_REQUEST);


//        if (cartItem.getProduct() != null && cartItem.getQuantity() > 0) {
//            cartItemRepository.save(cartItem);
//            return new ResponseEntity<>("Product added to cart successfully", HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>("Invalid product or quantity", HttpStatus.BAD_REQUEST);
//        }
    }
}
