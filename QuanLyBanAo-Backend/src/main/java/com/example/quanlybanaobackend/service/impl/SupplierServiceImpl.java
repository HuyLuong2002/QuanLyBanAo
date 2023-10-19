package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.model.Supplier;
import com.example.quanlybanaobackend.repository.SupplierRepository;
import com.example.quanlybanaobackend.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    public SupplierRepository supplierRepository;

    @Override
    public List<Supplier> getSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Supplier getSupplierById(int id) {
        boolean isPresent = supplierRepository.findById(id).isPresent();
        if(isPresent)
        {
            return supplierRepository.findById(id).get();
        }
        else return null;
    }
    @Override
    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }
    @Override
    public Supplier updateSupplier(int id, Supplier supplier){

//        Supplier newSupplier = supplierRepository.findById(id).get();
//        newSupplier.setId(supplier.getId());
//        newSupplier.setName(supplier.getName());
//        newSupplier.setDeleted(supplier.getDeleted());
        supplier.setId(id);
        return supplierRepository.save(supplier);
    }

    @Override
    public void deleteSupplier(int id){
        Supplier supplier = supplierRepository.findById(id).get();
        supplier.setDeleted(true);
        supplierRepository.save(supplier);
    }
}