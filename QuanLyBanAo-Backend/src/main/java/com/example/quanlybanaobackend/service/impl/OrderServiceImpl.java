package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Order;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.OrderRepository;
import com.example.quanlybanaobackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> findAllUserOrder(User user) {
        return orderRepository.findAllUserOrder(user);
    }

    @Override
    public Order updateOrders(int id, Order order) {
        Order oldOrder = findById(id);
        oldOrder.setOrderStatus(order.getOrderStatus());
        oldOrder.setPaymentStatus(order.getPaymentStatus());
        oldOrder.setShipStatus(order.getShipStatus());
        return orderRepository.save(oldOrder);

    }

    @Override
    public void deleteOrder(int id) {
        Order removeOrder = findById(id);
        removeOrder.setOrderStatus(Constant.OrderStatus.UNACTIVE);
    }

    @Override
    public Order findById(int id) {
        boolean isPresent = orderRepository.findById(id).isPresent();
        if(isPresent)
        {
            return orderRepository.findById(id).get();
        }
        return null;
    }



    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }


}
