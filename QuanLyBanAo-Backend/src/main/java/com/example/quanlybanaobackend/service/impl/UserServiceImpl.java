package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.UserRepository;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id).get();
    }

    @Override
    public User createUser(User user) { return userRepository.save(user); }

    @Override
    public User updateUser(int id, User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        User user = userRepository.findById(id).get();
        user.setDeleted(true);
        userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByEmail(username);
    }
}