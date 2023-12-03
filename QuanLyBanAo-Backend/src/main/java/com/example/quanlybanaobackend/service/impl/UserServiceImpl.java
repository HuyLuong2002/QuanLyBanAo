package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.dto.UserDTO;
import com.example.quanlybanaobackend.model.Role;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.RoleRepository;
import com.example.quanlybanaobackend.repository.UserRepository;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public User getUserById(int id) {
        boolean isPresent = userRepository.findById(id).isPresent();
        if (isPresent) {
            return userRepository.findById(id).get();
        }
        return null;
    }

    @Override
    public void createUser(User user) {
        user.setStatus(Constant.UserStatus.ACTIVE);
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        user.setDeleted(false);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        if(user.getRoles().stream().findFirst().isPresent())
        {
            Role roles = roleRepository.findByName(user.getRoles().stream().findFirst().get().getName()).get();
            user.setRoles(Collections.singletonList(roles));
            userRepository.save(user);
        }

    }


    @Override
    public User updateUser(int id, User user) {
        User oldUser = getUserById(id);
        if (oldUser != null) {
            oldUser.setFirstName(user.getFirstName());
            oldUser.setLastName(user.getLastName());
            oldUser.setSex(user.getSex());
            oldUser.setDateOfBirth(user.getDateOfBirth());
            oldUser.setAddress(user.getAddress());
            oldUser.setTel(user.getTel());
            oldUser.setStatus(user.getStatus());
            oldUser.setUpdatedAt(new Date());
            oldUser.setRoles(user.getRoles());
            oldUser.setDeleted(user.isDeleted());

            return userRepository.save(oldUser);
        }
        return null;

    }

    @Override
    public User updateUserProfile(int id, User user) {
        User oldUser = getUserById(id);
        if (oldUser != null) {
            oldUser.setId(user.getId());
            oldUser.setFirstName(user.getFirstName());
            oldUser.setLastName(user.getLastName());
            oldUser.setSex(user.getSex());
            oldUser.setDateOfBirth(user.getDateOfBirth());
            oldUser.setAddress(user.getAddress());
            oldUser.setTel(user.getTel());
            oldUser.setUpdatedAt(new Date());

            return userRepository.save(oldUser);
        }
        return null;
    }

    public User deleteUser(int id) {
        boolean isPresent = userRepository.findById(id).isPresent();
        if (isPresent) {
            User user = userRepository.findById(id).get();
            user.setDeleted(!user.isDeleted());
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    @Override
    public User updateUserPassword(User currentUser, User userUpdate) {
        currentUser.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
        return userRepository.save(currentUser);
    }

}