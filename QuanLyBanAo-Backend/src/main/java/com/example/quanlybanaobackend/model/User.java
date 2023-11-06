package com.example.quanlybanaobackend.model;

import com.example.quanlybanaobackend.constant.Constant;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "sex")
    @Enumerated(EnumType.STRING)
    private Constant.Gender sex;

    @Column(name = "date_of_birth")
    // Sử dụng @Temporal để chỉ định kiểu thời gian
    @Temporal(TemporalType.DATE)
    private Date dateOfBirth;

    @Column(name = "address")
    private String address;

    @Column(name = "tel")
    private String tel;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Constant.UserStatus status;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "created_at")
    @CreatedDate
    private Date createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Date updatedAt;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private ShoppingCart shoppingCart;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonBackReference
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY)
    @JsonBackReference
    @JsonIgnore
    private List<Order> approvedOrder;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "customers_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id"))
    private Collection<Role> roles;

}