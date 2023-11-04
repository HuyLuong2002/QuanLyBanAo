package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getCategories();
    Category save(Category category);
    Category findById(int id);

    Category updateCategory(int id, Category category);
}
