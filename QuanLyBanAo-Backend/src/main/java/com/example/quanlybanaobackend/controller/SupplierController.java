package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.Category;
import com.example.quanlybanaobackend.model.Supplier;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.service.SupplierService;
import com.example.quanlybanaobackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @Autowired
    private AuthController authController;

    @Autowired
    private UserService userService;

    @GetMapping()
    public List<Supplier> getSuppliers(){
        return supplierService.getSuppliers();
    }

    @GetMapping(path="/{id}")
    public Supplier getSupplierById(@PathVariable int id){
        return supplierService.getSupplierById(id);
    }

    @PostMapping()
    public ResponseEntity<String> createSupplier(@RequestBody Supplier supplier){
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn không có quyền thực hiện chức năng này");
            }
            Supplier createsupplier = supplierService.createSupplier(supplier);
            if(createsupplier != null){
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return ResponseEntity.status(HttpStatus.CREATED).body("Thêm nhà cung cấp thành công!");
            } else {
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thêm nhà cung cấp thất bại");
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn chưa đăng nhập!");

    }

    @PutMapping(path="/{id}")
    public ResponseEntity<String> updateSupplier(@PathVariable int id, @RequestBody Supplier supplier){
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn không có quyền thực hiện chức năng này");
            }
            Supplier getSupplier = supplierService.getSupplierById(id);
            if(getSupplier == null || getSupplier.isDeleted()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy nhà cung cấp!");
            }
            Supplier updateSupplier = supplierService.updateSupplier(id, supplier);
            if(updateSupplier != null){
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return ResponseEntity.status(HttpStatus.OK).body("Sửa nhà cung cấp thành công!");
            } else {
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Sửa nhà cung cấp thất bại");
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn chưa đăng nhập!");

    }

    @PutMapping(path="/delete/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable int id){
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn không có quyền thực hiện chức năng này");
            }
            Supplier getSupplier = supplierService.getSupplierById(id);
            if(getSupplier == null || getSupplier.isDeleted()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Không tìm thấy nhà cung cấp!");
            } else {
                supplierService.deleteSupplier(id);
                return ResponseEntity.status(HttpStatus.OK).body("Xóa nhà cung cấp thành công");
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bạn chưa đăng nhập!");

    }

}