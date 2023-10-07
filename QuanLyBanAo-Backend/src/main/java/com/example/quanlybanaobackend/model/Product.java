package com.example.quanlybanaobackend.model;

import com.example.quanlybanaobackend.constant.Constant;
import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private int quantity;
    @Getter
    @Setter
    private int price;
    @Getter
    @Setter
    private String description;
    @Getter
    @Setter
    private String image;
    @Getter
    @Setter
    private String size;
    @ManyToOne
    @JoinColumn(name = "category_id")
    @Getter
    @Setter
    private Category category;
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    @Getter
    @Setter
    private Supplier supplier;
    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private Constant.Color color;
    @Getter
    @Setter
    private boolean isDeleted;
}
