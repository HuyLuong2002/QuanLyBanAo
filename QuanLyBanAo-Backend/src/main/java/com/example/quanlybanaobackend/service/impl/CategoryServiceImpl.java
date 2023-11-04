package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.repository.CategoryRepository;
import com.example.quanlybanaobackend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category findById(int id) {
        boolean isPresent = categoryRepository.findById(id).isPresent();
        if (isPresent) {
            return categoryRepository.findById(id).get();
        } else return null;
    }

    @Override
    public Category updateCategory(int id, Category category) {
        Category oldCategory = findById(id);
        oldCategory.setName(category.getName());
        oldCategory.setDeleted(category.isDeleted());
        return categoryRepository.save(oldCategory);
    }
}
