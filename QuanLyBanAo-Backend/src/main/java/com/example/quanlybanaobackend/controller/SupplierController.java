package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.Supplier;
import com.example.quanlybanaobackend.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;

    @GetMapping()
    public List<Supplier> getSuppliers(){
        return supplierService.getSuppliers();
    }

    @GetMapping(path="/{id}")
    public Supplier getSupplierById(@PathVariable int id){
        return supplierService.getSupplierById(id);
    }

    @PostMapping()
    public Supplier createSupplier(@RequestBody Supplier supplier){
        return supplierService.createSupplier(supplier);
    }

    @PutMapping(path="/{id}")
    public Supplier updateSupplier(@PathVariable int id, @RequestBody Supplier supplier){
        return supplierService.updateSupplier(id, supplier);
    }

    @PutMapping(path="/delete/{id}")
    public void deleteSupplier(@PathVariable int id){
        supplierService.deleteSupplier(id);
    }

}