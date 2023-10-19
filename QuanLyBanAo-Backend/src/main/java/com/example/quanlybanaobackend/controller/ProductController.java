package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.model.Product;
import com.example.quanlybanaobackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @GetMapping(path = {"/get"})
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping(path = {"/get/{id}"})
    public Product getProductById(@PathVariable int id){
        return productService.findById(id);
    }

    @GetMapping(path = {"/getByColor"})
    public List<Product> getProductByColor(@RequestParam(name = "color") Constant.Color color){
        return productService.findByColor(color);
    }

    @GetMapping(path = {"/getByName"})
    public List<Product> getProductByName(@RequestParam(name = "name") String name){
        return productService.findByName(name);
    }

    @GetMapping(path = {"/getByMaxPrice"})
    public List<Product> getProductByMaxPrice(){
        return productService.findByMaxPrice();
    }

    @GetMapping(path = {"/getByMinPrice"})
    public List<Product> getProductByMinPrice(){
        return productService.findByMinPrice();
    }

    @GetMapping(path = {"/getUnderPrice"})
    public List<Product> getProductUnderCertainPrice(@RequestParam(name="price") String price){
        return productService.findUnderCertainPrice(price);
    }

    @GetMapping(path = {"/getOverPrice"})
    public List<Product> getProductOverCertainPrice(@RequestParam(name="price") String price){
        return productService.findOverCertainPrice(price);
    }

    @GetMapping(path = {"/getBetweenPrice"})
    public List<Product> getProductBetweenCertainPrice(@RequestParam(name="priceA") String priceA,@RequestParam(name="priceB") String priceB){
        return productService.findBetweenCertainPrice(priceA,priceB);
    }

    @PostMapping(path = {"/create"})
    public ResponseEntity<String> createProducts(@RequestBody Product product){
        Product savedProduct = productService.save(product);
        if (savedProduct != null) {
            // Trả về HTTP status code 201 (Created) và thông báo thành công
            return ResponseEntity.status(HttpStatus.CREATED).body("Thêm sản phẩm thành công.");
        } else {
            // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm sản phẩm thất bại");
        }
    }
    @PutMapping(path = {"/update/{id}"})
    public ResponseEntity<String> updateProducts(@RequestBody Product product, @PathVariable int id){
        Product getProduct = productService.findById(id);
        if (getProduct == null || getProduct.isDeleted())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy sản phẩm!");
        getProduct.setName(product.getName());
        getProduct.setPrice(product.getPrice());
        getProduct.setQuantity(product.getQuantity());
        getProduct.setImage(product.getImage());
        getProduct.setDescription(product.getDescription());
        getProduct.setCategory(product.getCategory());
        getProduct.setSize(product.getSize());
        getProduct.setSupplier(product.getSupplier());
        getProduct.setColor(product.getColor());
        getProduct.setDeleted(product.isDeleted());
        Product updateProduct = productService.save(getProduct);
        if(updateProduct != null)
        {
            // Trả về HTTP status code 200 (OK) và thông báo thành công
            return ResponseEntity.status(HttpStatus.OK).body("Sửa sản phẩm thành công");
        }
        // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
        else return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sửa sản phẩm thất bại");
    }

    @PutMapping(path = {"/delete/{id}"})
    public ResponseEntity<String> deleteProducts(@PathVariable int id){
        Product deleteProduct = productService.findById(id);
        if (deleteProduct == null || deleteProduct.isDeleted())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy sản phẩm!");
        deleteProduct.setDeleted(true);
        productService.save(deleteProduct);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa sản phẩm thành công");
    }
}
