package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.dto.UserDTO;
import com.example.quanlybanaobackend.model.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserById(int id);


    void createUser(User user);

    User updateUser(int id, User user);

    User updateUserProfile(int id, User user);

    void deleteUser(int id);

    User findByUsername(String username);
}