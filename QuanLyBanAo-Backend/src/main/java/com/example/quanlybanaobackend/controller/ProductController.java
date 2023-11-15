package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.CategoryService;
import com.example.quanlybanaobackend.service.ProductService;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthController authController;

    @GetMapping()
    public ResponseEntity<Map<String, Object>> getProducts(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.getProducts(pageable));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> getProductById(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findById(id));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/color/{color}"})
    public ResponseEntity<Map<String, Object>> getProductByColor(@PathVariable Constant.Color color) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findByColor(color));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/name/{name}"})
    public ResponseEntity<Map<String, Object>> getProductByName(@PathVariable String name) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findByName(name));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/filter"})
    public ResponseEntity<Map<String, Object>> getProductByCategory(@RequestParam(defaultValue = "0") int categoryId,
                                                                    @RequestParam(required = false) Constant.Color color,
                                                                    @RequestParam(required = false) String price,
                                                                    @RequestParam(required = false) String keyword,
                                                                    @RequestParam(required = false, defaultValue = "1") int orderById,
                                                                    @RequestParam(defaultValue = "0") int page) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        Category category = categoryService.findById(categoryId);
        if (category != null) {
            Pageable pageable = PageRequest.of(page, 10);
            if (orderById == 1)
            {
                response.put("success", true);
                response.put("products", productService.findByCategoryASC(category, color, price, keyword, pageable));
            }
            else if(orderById == 2) {
                response.put("success", true);
                response.put("products", productService.findByCategoryDESC(category, color, price, keyword, pageable));
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("success", true);
        response.put("products", null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = {"/max-price"})
    public ResponseEntity<Map<String, Object>> getProductByMaxPrice() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findByMaxPrice());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/min-price"})
    public ResponseEntity<Map<String, Object>> getProductByMinPrice() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findByMinPrice());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/under-price"})
    public ResponseEntity<Map<String, Object>> getProductUnderCertainPrice(@RequestParam(name = "price") String price) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findUnderCertainPrice(price));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/over-price"})
    public ResponseEntity<Map<String, Object>> getProductOverCertainPrice(@RequestParam(name = "price") String price) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findOverCertainPrice(price));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/between-price"})
    public ResponseEntity<Map<String, Object>> getProductBetweenCertainPrice(@RequestParam(name = "priceA") String priceA, @RequestParam(name = "priceB") String priceB) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("products", productService.findBetweenCertainPrice(priceA, priceB));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = {"/create"})
    public ResponseEntity<Map<String, Object>> createProducts(@RequestBody Product product) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            if (Objects.equals(user.getRoles().stream().findFirst().get().getName(), "CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            Product savedProduct = productService.save(product);
            if (savedProduct != null) {
                response.put("success", true);
                response.put("product", savedProduct);
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            } else {
                response.put("message", "Thêm sản phẩm thất bại");
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> updateProducts(@RequestBody Product product, @PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            if (Objects.equals(user.getRoles().stream().findFirst().get().getName(), "CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Product getProduct = productService.findById(id);
            if (getProduct == null || getProduct.isDeleted()) {
                response.put("message", "Không tìm thấy sản phẩm");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Product updateProduct = productService.updateProduct(id, product);
            if (updateProduct != null) {
                response.put("success", true);
                response.put("product", updateProduct);
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
            else {
                response.put("message", "Sửa sản phẩm thất bại");
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<Map<String, Object>> deleteProducts(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.findByUsername(username);
            if (Objects.equals(user.getRoles().stream().findFirst().get().getName(), "CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Product deleteProduct = productService.findById(id);
            if (deleteProduct == null || deleteProduct.isDeleted()) {
                response.put("message", "Không tìm thấy sản phẩm");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            productService.deleteProduct(id);
            response.put("success", true);
            response.put("message", "Xóa sản phẩm thành công");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }
}
