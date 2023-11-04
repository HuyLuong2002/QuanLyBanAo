package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.model.User;
import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticalBestSellEmployeeDTO {
    private Long totalQuantity = 0L;
    private User seller;
}
