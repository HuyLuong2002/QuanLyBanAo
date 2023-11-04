package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.model.Product;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RevenueByMonthDTO {
    private int year;
    private int month;
    private double totalPrice = 0.0;

}
