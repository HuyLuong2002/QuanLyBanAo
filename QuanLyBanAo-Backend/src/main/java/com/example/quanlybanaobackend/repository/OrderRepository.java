package com.example.quanlybanaobackend.repository;

import com.example.quanlybanaobackend.dto.*;
import com.example.quanlybanaobackend.model.Order;
import com.example.quanlybanaobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query("select o from Order o order by o.orderDate desc ")
    List<Order> getAll();

    @Query("select o from Order o where o.user = :user and o.orderStatus = 'ACTIVE' order by o.orderDate desc")
    List<Order> findAllUserOrder(@Param("user") User user);

    @Query("select new com.example.quanlybanaobackend.dto.StatisticalBestSellCustomerDTO(sum(o.totalQuantity), o.user) " +
            "from Order o where o.orderStatus != 'INACTIVE'" +
            "group by o.user.id order by o.totalQuantity desc limit 5")
    List<StatisticalBestSellCustomerDTO> getTop10CustomerBestSell();

    @Query("select new com.example.quanlybanaobackend.dto.RevenueByMonthDTO(year (o.orderDate), month (o.orderDate), " +
            "sum (o.totalPrice)) from Order o " +
            "where o.orderStatus != 'INACTIVE' " +
            "and year(o.orderDate) = :year " +
            "group by year(o.orderDate), month(o.orderDate) " +
            "order by year(o.orderDate), month(o.orderDate)")
    List<RevenueByMonthDTO> getRevenueByMonth(@Param("year") int year);

    @Query("select new com.example.quanlybanaobackend.dto.RevenueByWeekDaysDTO(" +
            "DAYOFWEEK(o.orderDate), MONTH(o.orderDate), YEAR(o.orderDate), sum(o.totalPrice)) " +
            "from Order o where o.orderStatus != 'INACTIVE' and o.orderDate >= :firstDate " +
            "and o.orderDate <= :secondDate " +
            "group by dayofweek(o.orderDate) " +
            "order by dayofweek(o.orderDate) ")
    List<RevenueByWeekDaysDTO> getRevenueByWeekDays(Date firstDate, Date secondDate);
    @Query("select new com.example.quanlybanaobackend.dto.StatisticalBestSellEmployeeDTO(sum(o.totalQuantity), o.employee) " +
            "from Order o where o.orderStatus != 'INACTIVE' and o.shipStatus != 'APPROVAL'" +
            "group by o.employee.id order by o.totalQuantity desc limit 5")
    List<StatisticalBestSellEmployeeDTO> getTop10EmployeeBestSell();

    @Query("select o from Order o where o.orderStatus != 'INACTIVE' and o.shipStatus = 'APPROVAL'")
    List<Order> getApprovedOrder();
    @Query("select o from Order o where o.orderDate >= :firstDate and o.orderDate <= :secondDate and o.orderStatus != 'INACTIVE'")
    List<Order> getOrderByDay(Date firstDate, Date secondDate);
}
