package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.User;

public interface UserService {

    Iterable<User> getAllUsers();

    User getUserById(Long id);

    User createUser(User user);

    User updateUser(Long id, User user);

    void deleteUser(Long id);
}