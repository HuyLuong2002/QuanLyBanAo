package com.example.quanlybanaobackend.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "suppliers")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    private int id;
    private String name;
    private boolean isDeleted;
}
