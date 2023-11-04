package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping()
    public List<Category> getCategories(){
        return categoryService.getCategories();
    }
    @GetMapping(path = {"/{id}"})
    public Category getCategoryById(@PathVariable int id){
        return categoryService.findById(id);
    }
    @PostMapping(path = {""})
    public ResponseEntity<String> createCategories(@RequestBody Category category){
        Category saveCategory = categoryService.save(category);
        if (saveCategory != null){
            // Trả về HTTP status code 201 (Created) và thông báo thành công
            return ResponseEntity.status(HttpStatus.CREATED).body("Thêm thể loại thành công.");
        } else {
            // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm thể loại thất bại");
        }
    }
    @PutMapping(path = {"/{id}"})
    public ResponseEntity<String> updateCategory(@RequestBody Category category, @PathVariable int id){
        Category getCategory = categoryService.findById(id);
        if(getCategory == null || getCategory.isDeleted()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy thể loại!");
        }
        Category updateCategory = categoryService.updateCategory(id, category);
        if (updateCategory != null){
            // Trả về HTTP status code 200 (OK) và thông báo thành công
            return ResponseEntity.status(HttpStatus.OK).body("Sửa thể loại thành công");
        }
        // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sửa thể loại thất bại");
    }
    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<String> deleteCategory(@PathVariable int id){
        Category deleteCategory = categoryService.findById(id);
        if(deleteCategory == null || deleteCategory.isDeleted()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy thể loại!");
        }
        deleteCategory.setDeleted(true);
        categoryService.save(deleteCategory);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa thể loại thành công");
    }
}
