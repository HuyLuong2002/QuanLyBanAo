package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.OrderDetail;
import com.example.quanlybanaobackend.model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {

    private int id;
    private String orderDate;
    private int totalQuantity;
    private double totalPrice;

    private double shippingFee = 25.0;

    private Constant.OrderStatus orderStatus;

    private Constant.ShipStatus shipStatus;

    private Constant.PaymentStatus paymentStatus;

    private Constant.PaymentMethod paymentMethod;
    private String notes;

    private UserDTO user; //customer

    private UserDTO employee; //employee

    private List<OrderDetail> orderDetails;
}
