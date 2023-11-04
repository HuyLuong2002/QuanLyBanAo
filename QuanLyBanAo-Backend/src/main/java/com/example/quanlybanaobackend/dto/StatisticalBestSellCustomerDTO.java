package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.model.User;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticalBestSellCustomerDTO {
    private Long totalQuantity = 0L;
    private User customer;
}
