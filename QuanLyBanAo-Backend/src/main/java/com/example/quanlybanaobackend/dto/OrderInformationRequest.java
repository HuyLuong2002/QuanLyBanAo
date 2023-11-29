package com.example.quanlybanaobackend.dto;

import com.example.quanlybanaobackend.constant.Constant;
import lombok.Data;

@Data
public class OrderInformationRequest {
    private Constant.PaymentMethod paymentMethod;
    private String notes;
}
