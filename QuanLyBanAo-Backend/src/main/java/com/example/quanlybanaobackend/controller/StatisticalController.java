package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.dto.*;
import com.example.quanlybanaobackend.service.OrderDetailService;
import com.example.quanlybanaobackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/statistical")
public class StatisticalController {

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private OrderService orderService;

    @GetMapping(path = {"/top10ProductBestSell"})
    public List<StatisticalBestSellProductDTO> getTop10ProductBestSell()
    {
        return orderDetailService.getTop10ProductBestSell();
    }


    @GetMapping(path = {"/top10CustomerBestSell"})
    public List<StatisticalBestSellCustomerDTO> getTop10CustomerBestSell()
    {
        return orderService.getTop10CustomerBestSell();
    }

    @GetMapping(path = {"/revenueByMonth/{year}"})
    public List<RevenueByMonthDTO> getRevenueByMonth(@PathVariable int year)
    {
        return orderService.getRevenueByMonth(year);
    }

    @GetMapping(path = {"/revenueByWeekDays"})
    public List<RevenueByWeekDaysDTO> getRevenueByWeekDays(@RequestParam String firstDate, @RequestParam String secondDate) throws ParseException {
        return orderService.getRevenueByWeekDays(firstDate, secondDate);
    }

    @GetMapping(path = {"/top10EmployeeBestSell"})
    public List<StatisticalBestSellEmployeeDTO> getTop10EmployeeBestSell() {
        return orderService.getTop10EmployeeBestSell();
    }
}
