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
<<<<<<< HEAD
=======

    public Supplier() {
    }

    public Supplier(int id, String name, boolean isDeleted) {
        this.id = id;
        this.name = name;
        this.isDeleted = isDeleted;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
>>>>>>> 72728cedae41c235d679d87b391fda0fced1132a
}
