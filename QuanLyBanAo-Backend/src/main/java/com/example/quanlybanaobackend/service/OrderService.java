package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.dto.RevenueByMonthDTO;
import com.example.quanlybanaobackend.dto.RevenueByWeekDaysDTO;
import com.example.quanlybanaobackend.dto.StatisticalBestSellCustomerDTO;
import com.example.quanlybanaobackend.dto.StatisticalBestSellEmployeeDTO;
import com.example.quanlybanaobackend.model.Order;
import com.example.quanlybanaobackend.model.User;
import org.aspectj.weaver.ast.Or;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface OrderService {

    List<Order> getOrders();

    List<Order> findAllUserOrder(User user);

    Order updateOrders(int id, Order order);

    Order deleteOrder(int id);

    Order findById(int id);

    Order save(Order order);

    List<StatisticalBestSellCustomerDTO> getTop10CustomerBestSell();

    List<RevenueByMonthDTO> getRevenueByMonth(int year);

    List<RevenueByWeekDaysDTO> getRevenueByWeekDays(String firstDate, String secondDate) throws ParseException;

    List<StatisticalBestSellEmployeeDTO> getTop10EmployeeBestSell();

    List<Order> getOrderByDay(String firstDate, String secondDate) throws ParseException;

    List<Order> getApprovalOrder();

    Order approveOrder(int id, User user);
    boolean exportDataExcel(int id, String templatePath, String outputPath) throws IOException, ParseException, InterruptedException;
}
