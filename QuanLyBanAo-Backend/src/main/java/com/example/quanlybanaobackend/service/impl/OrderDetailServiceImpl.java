package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.dto.StatisticalBestSellProductDTO;
import com.example.quanlybanaobackend.repository.OrderDetailRepository;
import com.example.quanlybanaobackend.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Override
    public List<StatisticalBestSellProductDTO> getTop10ProductBestSell() {
        return orderDetailRepository.getTop10ProductBestSell();
    }
}
