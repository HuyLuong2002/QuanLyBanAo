package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.model.Supplier;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;

@Getter
@Setter
@Data
public class ProductDTO {

    private int id;

    private String name;

    private int price;

    private String description;

    private String image;

    private String size;

    private Category category;

    private Supplier supplier;

    private Constant.Color color;

    private boolean isDeleted;

    private String createdAt;

    private String updatedAt;


}
