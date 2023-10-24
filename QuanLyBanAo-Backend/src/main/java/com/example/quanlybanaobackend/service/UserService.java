package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.User;

public interface UserService {

    Iterable<User> getAllUsers();

    User getUserById(int id);

    User createUser(User user);

    User updateUser(int id, User user);

    void deleteUser(int id);

    User findByUsername(String username);
}