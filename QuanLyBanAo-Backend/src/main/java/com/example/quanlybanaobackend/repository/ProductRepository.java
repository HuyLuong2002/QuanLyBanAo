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

    @Query("SELECT p FROM Product p order by p.name desc ")
    Page<Product> getAll(Pageable pageable);

    List<Product> getProductsByCategory(Category category);

    @Query(value = "SELECT * FROM products p where p.category_id = ?1 and p.product_id != ?2 limit 4", nativeQuery = true)
    List<Product> getRelatedProduct(int categoryId, int productId);
    @Query("SELECT p from Product p where p.color = :color")
    List<Product> findProductByColor(@Param("color") Constant.Color color);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(concat('%', :name, '%'))")
    List<Product> findProductByName(@Param("name") String name);

    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and p.price > :minPrice " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name ASC ")
    Page<Product> findByCategoryASCGreaterThan(@Param("category") Category category, @Param("color") Constant.Color color,
                                    @Param("minPrice") int minPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and p.price >= :minPrice " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name ASC ")
    Page<Product> findByCategoryASCGreaterThanOrEqual(@Param("category") Category category, @Param("color") Constant.Color color,
                                    @Param("minPrice") int minPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and p.price < :maxPrice " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name ASC ")
    Page<Product> findByCategoryASCLessThan(@Param("category") Category category, @Param("color") Constant.Color color, @Param("maxPrice") int maxPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and p.price <= :maxPrice " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name ASC ")
    Page<Product> findByCategoryASCLessThanOrEqual(@Param("category") Category category, @Param("color") Constant.Color color, @Param("maxPrice") int maxPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and (p.price >= :minPrice and p.price <= :maxPrice) " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name ASC ")
    Page<Product> findByCategoryASCBetween(@Param("category") Category category, @Param("color") Constant.Color color,
                                    @Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and p.price = :minPrice " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name ASC ")
    Page<Product> findByCategoryASC(@Param("category") Category category, @Param("color") Constant.Color color,
                                    @Param("minPrice") int minPrice, @Param("keyword") String keyword, Pageable pageable);


    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and p.price = :minPrice " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name DESC ")
    Page<Product> findByCategoryDESC(@Param("category") Category category, @Param("color") Constant.Color color,
                                     @Param("minPrice") int minPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category and p.color = :color and p.price > :minPrice " +
            "and LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name DESC ")
    Page<Product> findByCategoryDESCGreaterThan(@Param("category") Category category, @Param("color") Constant.Color color,
                                               @Param("minPrice") int minPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category or p.color = :color or p.price >= :minPrice " +
            "or LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name DESC ")
    Page<Product> findByCategoryDESCGreaterThanOrEqual(@Param("category") Category category, @Param("color") Constant.Color color,
                                                      @Param("minPrice") int minPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category or p.color = :color or p.price < :maxPrice " +
            "or LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name DESC ")
    Page<Product> findByCategoryDESCLessThan(@Param("category") Category category, @Param("color") Constant.Color color, @Param("maxPrice") int maxPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category or p.color = :color or p.price <= :maxPrice " +
            "or LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name DESC ")
    Page<Product> findByCategoryDESCLessThanOrEqual(@Param("category") Category category, @Param("color") Constant.Color color, @Param("maxPrice") int maxPrice, @Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category = :category or p.color = :color or (p.price >= :minPrice and p.price <= :maxPrice) " +
            "or LOWER(p.name) LIKE LOWER(concat('%', :keyword, '%')) order by p.name DESC ")
    Page<Product> findByCategoryDESCBetween(@Param("category") Category category, @Param("color") Constant.Color color,
                                           @Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice, @Param("keyword") String keyword, Pageable pageable);


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


    Page<Product> findByPriceGreaterThan(int minPrice, Pageable pageable);
    Page<Product> findByPriceGreaterThanEqual(int minPrice, Pageable pageable);
    Page<Product> findByPriceLessThan(int maxPrice, Pageable pageable);
    Page<Product> findByPriceLessThanEqual(int maxPrice, Pageable pageable);
    Page<Product> findByPriceBetween(int minPrice, int maxPrice, Pageable pageable);
}
