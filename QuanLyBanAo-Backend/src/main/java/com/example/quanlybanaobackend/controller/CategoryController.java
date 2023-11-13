package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.CategoryService;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthController authController;

    @GetMapping()
    public ResponseEntity<Map<String, Object>> getCategories() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("categories", categoryService.getCategories());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> getCategoryById(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("category", categoryService.findById(id));
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @PostMapping()
    public ResponseEntity<Map<String, Object>> createCategories(@RequestBody Category category) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Category saveCategory = categoryService.save(category);
            if (saveCategory != null) {
                response.put("success", true);
                response.put("category", saveCategory);
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            } else {
                response.put("message", "Thêm thể loại thất bại");
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = {"/{id}"})
    public ResponseEntity<Map<String, Object>> updateCategory(@RequestBody Category category, @PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Category getCategory = categoryService.findById(id);
            if (getCategory == null || getCategory.isDeleted()) {

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Category updateCategory = categoryService.updateCategory(id, category);
            if (updateCategory != null) {
                response.put("success", true);
                response.put("category", updateCategory);
                // Trả về HTTP status code 200 (OK) và thông báo thành công
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
            response.put("message", "Sửa thể loại thất bại");
            // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Category deleteCategory = categoryService.findById(id);
            if (deleteCategory == null || deleteCategory.isDeleted()) {
                response.put("message", "Không tìm thấy thể loại");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            deleteCategory.setDeleted(true);
            categoryService.save(deleteCategory);
            response.put("success", true);
            response.put("message", "Xóa thể loại thành công");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }
}
