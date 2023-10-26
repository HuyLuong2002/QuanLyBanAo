package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.model.ShoppingCart;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.ProductService;
import com.example.quanlybanaobackend.service.ShoppingCartService;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private UserService userService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private ProductService productService;


    @Autowired
    private AuthController authController;


    @PostMapping("/add")
    public ResponseEntity<String> addItemToCart(
            @RequestParam("id") int productId,
            @RequestParam(value = "quantity", required = false, defaultValue = "1") int quantity) {
        if(authController.getUserLogin() != null)
        {
            Product product = productService.findById(productId);
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            ShoppingCart cart = shoppingCartService.addItemToCart(product, quantity, user);

            return new ResponseEntity<>("Thêm sản phẩm vào giỏ hàng thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Thêm sản phẩm vào giỏ hàng thất bại!", HttpStatus.BAD_REQUEST);
    }


    @RequestMapping(value = "/update-cart", params = "action=update", method = RequestMethod.POST)
    public ResponseEntity<String> updateCart(@RequestParam("quantity") int quantity,
                             @RequestParam("id") int productId) {
        if(authController.getUserLogin() != null)
        {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            Product product = productService.findById(productId);
            ShoppingCart cart = shoppingCartService.updateItemInCart(product, quantity, user);

            return new ResponseEntity<>("Thêm sản phẩm vào giỏ hàng thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Sửa sản phẩm vào giỏ hàng thất bại!", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/update-cart", params = "action=delete", method = RequestMethod.POST)
    public ResponseEntity<String> deleteItemFromCart(@RequestParam("id") int productId) {
        if(authController.getUserLogin() != null)
        {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            Product product = productService.findById(productId);
            ShoppingCart cart = shoppingCartService.deleteItemFromCart(product, user);


            return new ResponseEntity<>("Xóa sản phẩm vào giỏ hàng thành công!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Xóa sản phẩm vào giỏ hàng thất bại!", HttpStatus.BAD_REQUEST);

    }
}
