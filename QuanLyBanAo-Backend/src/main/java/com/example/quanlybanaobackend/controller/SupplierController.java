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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, Object>> getSuppliers() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("suppliers", supplierService.getSuppliers());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Map<String, Object>> getSupplierById(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("supplier", supplierService.getSupplierById(id));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Map<String, Object>> createSupplier(@RequestBody Supplier supplier) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Supplier createsupplier = supplierService.createSupplier(supplier);
            if (createsupplier != null) {
                response.put("success", true);
                response.put("supplier", createsupplier);
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            } else {
                response.put("message", "Thêm nhà cung cấp thất bại");
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Map<String, Object>> updateSupplier(@PathVariable int id, @RequestBody Supplier supplier) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Supplier getSupplier = supplierService.getSupplierById(id);
            if (getSupplier == null || getSupplier.isDeleted()) {
                response.put("message", "Không tìm thấy nhà cung cấp");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Supplier updateSupplier = supplierService.updateSupplier(id, supplier);
            if (updateSupplier != null) {
                response.put("success", true);
                response.put("supplier", updateSupplier);
                // Trả về HTTP status code 201 (Created) và thông báo thành công
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("message", "Sửa nhà cung cấp thất bại");
                // Trả về HTTP status code 500 (Internal Server Error) và thông báo lỗi
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = "/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteSupplier(@PathVariable int id) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        if (authController.getUserLogin() != null) {
            User user = userService.findByUsername(authController.getUserLogin());
            if (user.getRoles().stream().findFirst().get().getName().equals("CUSTOMER")) {
                response.put("message", "Bạn không có quyền thực hiện chức năng này");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            Supplier getSupplier = supplierService.getSupplierById(id);
            if (getSupplier == null || getSupplier.isDeleted()) {
                response.put("message", "Không tìm thấy nhà cung cấp");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            } else {
                supplierService.deleteSupplier(id);
                response.put("success", true);
                response.put("message", "Xóa nhà cung cấp thành công");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        }
        response.put("message", "Bạn chưa đăng nhập");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}