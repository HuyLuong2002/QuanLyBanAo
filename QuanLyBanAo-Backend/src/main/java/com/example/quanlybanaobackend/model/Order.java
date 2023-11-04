package com.example.quanlybanaobackend.model;

import com.example.quanlybanaobackend.constant.Constant;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int id;
    private Date orderDate;
    private int totalQuantity;
    private double totalPrice;

    private double shippingFee = 25.0;

    @Enumerated(EnumType.STRING)
    private Constant.OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    private Constant.ShipStatus shipStatus;

    @Enumerated(EnumType.STRING)
    private Constant.PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private Constant.PaymentMethod paymentMethod;
    private String notes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user; //customer

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", referencedColumnName = "user_id")
    private User employee; //employee

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderDetail> orderDetails;

}
