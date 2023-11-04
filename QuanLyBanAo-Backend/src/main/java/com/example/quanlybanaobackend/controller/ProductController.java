package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.ProductService;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthController authController;
    @GetMapping()
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping(path = {"/{id}"})
    public Product getProductById(@PathVariable int id){
        return productService.findById(id);
    }

    @GetMapping(path = {"/color/{color}"})
    public List<Product> getProductByColor(@PathVariable Constant.Color color){
        return productService.findByColor(color);
    }

    @GetMapping(path = {"/name/{name}"})
    public List<Product> getProductByName(@PathVariable String name){
        return productService.findByName(name);
    }

    @GetMapping(path = {"/max-price"})
    public List<Product> getProductByMaxPrice(){
        return productService.findByMaxPrice();
    }

    @GetMapping(path = {"/min-price"})
    public List<Product> getProductByMinPrice(){
        return productService.findByMinPrice();
    }

    @GetMapping(path = {"/under-price"})
    public List<Product> getProductUnderCertainPrice(@RequestParam(name="price") String price){
        return productService.findUnderCertainPrice(price);
    }

    @GetMapping(path = {"/over-price"})
    public List<Product> getProductOverCertainPrice(@RequestParam(name="price") String price){
        return productService.findOverCertainPrice(price);
    }

    @GetMapping(path = {"/between-price"})
    public List<Product> getProductBetweenCertainPrice(@RequestParam(name="priceA") String priceA,@RequestParam(name="priceB") String priceB){
        return productService.findBetweenCertainPrice(priceA,priceB);
    }

    @PostMapping(path = {"/create"})
    public ResponseEntity<String> createProducts(@RequestBody Product product){
        if(authController.getUserLogin() != null)
        {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            if(!Objects.equals(user.getRoles().stream().findFirst().get().getName(), "EMPLOYEE"))
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn không có quyền thêm sản phẩm");
            product.setSeller(user);
            Product savedProduct = productService.save(product);
            if (savedProduct != null) {
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return ResponseEntity.status(HttpStatus.CREATED).body("Thêm sản phẩm thành công.");
            } else {
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm sản phẩm thất bại");
            }
        }
        return new ResponseEntity<>("Bạn chưa đăng nhập!", HttpStatus.BAD_REQUEST);

    }
    @PutMapping(path = {"/{id}"})
    public ResponseEntity<String> updateProducts(@RequestBody Product product, @PathVariable int id){
        Product getProduct = productService.findById(id);
        if (getProduct == null || getProduct.isDeleted())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy sản phẩm!");
        Product updateProduct = productService.updateProduct(id, product);
        if(updateProduct != null)
        {
            // Trả về HTTP status code 200 (OK) và thông báo thành công
            return ResponseEntity.status(HttpStatus.OK).body("Sửa sản phẩm thành công");
        }
        // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sửa sản phẩm thất bại");
    }

    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<String> deleteProducts(@PathVariable int id){
        Product deleteProduct = productService.findById(id);
        if (deleteProduct == null || deleteProduct.isDeleted())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy sản phẩm!");
        productService.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa sản phẩm thành công");
    }
}
