package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.model.Product;
import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticalBestSellProductDTO {
    private Long totalQuantity = 0L;
    private Product product;
}
