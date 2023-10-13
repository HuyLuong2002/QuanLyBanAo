package com.example.quanlybanaobackend.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.context.annotation.Bean;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int quantity;
    private int price;
    private String description;
    private String image;
    private String size;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
    @Enumerated(EnumType.STRING)
    private Color color;
    private boolean isDeleted;
}
