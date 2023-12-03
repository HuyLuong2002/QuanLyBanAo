package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.Supplier;

import java.util.List;

public interface SupplierService {
    List<Supplier> getSuppliers();
    Supplier createSupplier(Supplier supplier);
    Supplier getSupplierById(int id);

    Supplier updateSupplier(int id, Supplier supplier);

    Supplier deleteSupplier(int id);

}