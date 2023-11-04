package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.dto.StatisticalBestSellProductDTO;
import com.example.quanlybanaobackend.model.OrderDetail;

import java.util.List;

public interface OrderDetailService {

    List<StatisticalBestSellProductDTO> getTop10ProductBestSell();
}
