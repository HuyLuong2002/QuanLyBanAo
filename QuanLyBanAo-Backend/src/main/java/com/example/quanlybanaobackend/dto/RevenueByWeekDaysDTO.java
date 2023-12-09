package com.example.quanlybanaobackend.dto;

import lombok.*;

@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RevenueByWeekDaysDTO {
    private int dayOfWeek;
    private int month;
    private int year;
    private double totalPrice = 0.0;

}
