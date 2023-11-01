package com.example.quanlybanaobackend.repository;

import com.example.quanlybanaobackend.model.Order;
import com.example.quanlybanaobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("select o from Order o where o.user = :user")
    List<Order> findAllUserOrder(@Param("user") User user);

}
