package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.Order;
import com.example.quanlybanaobackend.model.User;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public interface OrderService {

    List<Order> getOrders();

    List<Order> findAllUserOrder(User user);

    Order updateOrders(int id, Order order);

    void deleteOrder(int id);

    Order findById(int id);

    Order save(Order order);
}
