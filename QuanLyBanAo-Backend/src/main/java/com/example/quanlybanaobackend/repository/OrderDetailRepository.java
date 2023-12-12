package com.example.quanlybanaobackend.repository;

import com.example.quanlybanaobackend.dto.StatisticalBestSellProductDTO;
import com.example.quanlybanaobackend.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    @Query("select new com.example.quanlybanaobackend.dto.StatisticalBestSellProductDTO(SUM(od.quantity), od.product) " +
            "from OrderDetail od where od.product.isDeleted = false group by od.product.id order by SUM(od.quantity) desc limit 10")
    List<StatisticalBestSellProductDTO> getTop10ProductBestSell();


}
