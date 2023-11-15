package com.example.quanlybanaobackend.repository;
import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT p from Product p where p.color = :color")
    List<Product> findProductByColor(@Param("color") Constant.Color color);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(concat('%', :name, '%'))")
    List<Product> findProductByName(@Param("name") String name);

    @Query("SELECT p FROM Product p WHERE p.category = :category or p.color = :color or p.price = :price " +
            "or LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by :orderBy ASC ")
    Page<Product> findByCategoryASC(@Param("category") Category category, @Param("color") Constant.Color color,
                                 @Param("price") String price, @Param("keyword") String keyword,
                                 @Param("orderBy") String orderBy, Pageable pageable);
    @Query("SELECT p FROM Product p WHERE p.category = :category or p.color = :color or p.price = :price " +
            "or LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by :orderBy DESC ")
    Page<Product> findByCategoryDESC(@Param("category") Category category, @Param("color") Constant.Color color,
                                 @Param("price") String price, @Param("keyword") String keyword,
                                 @Param("orderBy") String orderBy, Pageable pageable);

    //SELECT p FROM Product p WHERE p.price = (SELECT MAX(p2.price) FROM Product p2)
    //ORDER BY p.id ASC
    //LIMIT 1 -> lấy max 1 sản phẩm
    @Query("SELECT p FROM Product p WHERE p.price = (SELECT MAX(p2.price) FROM Product p2)")
    List<Product> findProductByMaxPrice();

    @Query("SELECT p FROM Product p WHERE p.price = (SELECT MIN(p2.price) FROM Product p2)")
    List<Product> findProductByMinPrice();

    @Query("SELECT p FROM Product p WHERE p.price < :price")
    List<Product> findProductUnderCertainPrice(@Param("price") String price);

    @Query("SELECT p FROM Product p WHERE p.price > :price")
    List<Product> findProductOverCertainPrice(@Param("price") String price);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :priceA AND :priceB")
    List<Product> findProductBetweenCertainPrice(@Param("priceA") String priceA, @Param("priceB") String priceB);

}
