package com.example.quanlybanaobackend.repository;
import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.id = ?1 AND u.status = ?2")
    User findByIdAndStatus(Long id, Constant.UserStatus status);

    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(String email);
}