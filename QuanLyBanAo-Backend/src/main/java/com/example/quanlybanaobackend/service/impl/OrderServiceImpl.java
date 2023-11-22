package com.example.quanlybanaobackend.service.impl;

import com.example.quanlybanaobackend.constant.Constant;
import com.example.quanlybanaobackend.dto.RevenueByMonthDTO;
import com.example.quanlybanaobackend.dto.RevenueByWeekDaysDTO;
import com.example.quanlybanaobackend.dto.StatisticalBestSellCustomerDTO;
import com.example.quanlybanaobackend.dto.StatisticalBestSellEmployeeDTO;
import com.example.quanlybanaobackend.model.Order;
import com.example.quanlybanaobackend.model.OrderDetail;
import com.example.quanlybanaobackend.model.User;
import com.example.quanlybanaobackend.repository.OrderRepository;
import com.example.quanlybanaobackend.service.OrderService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getOrders() {
        return orderRepository.getAll();
    }

    @Override
    public List<Order> findAllUserOrder(User user) {
        return orderRepository.findAllUserOrder(user);
    }

    @Override
    public Order updateOrders(int id, Order order) {
        Order oldOrder = findById(id);

        oldOrder.setOrderStatus(order.getOrderStatus());
        oldOrder.setPaymentStatus(order.getPaymentStatus());
        oldOrder.setShipStatus(order.getShipStatus());
        return orderRepository.save(oldOrder);

    }

    @Override
    public void deleteOrder(int id) {
        Order removeOrder = findById(id);
        removeOrder.setOrderStatus(Constant.OrderStatus.UNACTIVE);
    }

    @Override
    public Order findById(int id) {
        boolean isPresent = orderRepository.findById(id).isPresent();
        if (isPresent) {
            return orderRepository.findById(id).get();
        }
        return null;
    }


    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<StatisticalBestSellCustomerDTO> getTop10CustomerBestSell() {
        return orderRepository.getTop10CustomerBestSell();
    }

    @Override
    public List<RevenueByMonthDTO> getRevenueByMonth(int year) {
        return orderRepository.getRevenueByMonth(year);
    }

    @Override
    public List<RevenueByWeekDaysDTO> getRevenueByWeekDays(String firstDate, String secondDate) throws ParseException {
        Date date1 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(firstDate + " 00:00:00");
        Date date2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(secondDate + " 23:59:59");
        return orderRepository.getRevenueByWeekDays(date1, date2);
    }

    @Override
    public List<StatisticalBestSellEmployeeDTO> getTop10EmployeeBestSell() {
        return orderRepository.getTop10EmployeeBestSell();
    }

    @Override
    public List<Order> getOrderByDay(String firstDate, String secondDate) throws ParseException {
        Date date1 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(firstDate + " 00:00:00");
        Date date2 = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(secondDate + " 23:59:59");
        return orderRepository.getOrderByDay(date1, date2);
    }

    @Override
    public List<Order> getApprovalOrder() {
        return orderRepository.getApprovedOrder();
    }

    @Override
    public Order approveOrder(int id) {
        Order order = findById(id);
        order.setShipStatus(Constant.ShipStatus.SHIPPING);
        return orderRepository.save(order);
    }



    @Override
    public boolean exportDataExcel(int id, String templatePath, String outputPath) throws IOException, ParseException, InterruptedException {
        Order order = findById(id);
        if(order == null)
        {
            return false;
        }
        // Tạo đối tượng Date để lấy thời gian hiện tại
        Date now = new Date();
        // Sử dụng định dạng thời gian để tạo tên tệp duy nhất
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH-mm-ss");
        String timeStamp = dateFormat.format(now);
        // Tạo tên tệp đích dựa trên thời gian
        outputPath = outputPath + File.separator + "Invoice_" + timeStamp + ".xlsx";
        // Sao chép template Excel vào file đầu ra
        Files.copy(Paths.get(templatePath), Paths.get(outputPath), StandardCopyOption.REPLACE_EXISTING);
        // Đọc mẫu Excel từ tệp templatePath
        FileInputStream inputStream = new FileInputStream(outputPath);
        XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
        inputStream.close();

        // Lấy trang tính cần điền dữ liệu
        Sheet sheet = workbook.getSheet("Invoice");
        Map<String, String> valueMap = getDataEntryMap(order);
        // Lặp qua các dòng và ô trong trang tính
        for (Row row : sheet) {
            for (Cell cell : row) {
                if (cell.getCellType() == CellType.STRING) {
                    String cellValue = cell.getStringCellValue();
                    for (Map.Entry<String, String> entry : valueMap.entrySet()) {
                        String key = entry.getKey();
                        String replacement = entry.getValue();
                        cellValue = cellValue.replace("{{" + key + "}}", replacement);
                    }
                    cell.setCellValue(cellValue);
                }
            }
        }

        // Lặp qua danh sách dữ liệu hóa đơn
        int rowIndex = 13;
        XSSFSheet xssfSheet = workbook.getSheet("Invoice");

        for (OrderDetail invoice : order.getOrderDetails()) {
            XSSFRow row = xssfSheet.getRow(rowIndex);
            row.createCell(0);
            row.createCell(5);
            row.createCell(6);
            row.createCell(7);

            // Điền dữ liệu từ danh sách mua hàng vào các ô
            row.getCell(0).setCellValue(invoice.getProduct().getName());
            row.getCell(5).setCellValue(invoice.getQuantity());
            row.getCell(6).setCellValue(invoice.getUnitPrice());
            row.getCell(7).setCellValue(invoice.getQuantity() * invoice.getUnitPrice());

            // Tăng chỉ số hàng để điền dữ liệu tiếp theo
            rowIndex++;

            sheet.shiftRows(rowIndex, sheet.getLastRowNum(), 1, true, true);
            sheet.createRow(rowIndex);
        }
        // Lưu workbook với các giá trị đã thay thế ra file Excel đầu ra
        FileOutputStream outputStream = new FileOutputStream(outputPath);
        workbook.write(outputStream);

        outputStream.close();
        return true;
    }


    public Map<String, String> getDataEntryMap(Order order) throws ParseException {
        Map<String, String> valueMap = new HashMap<>();
        valueMap.put("CompanyName", "Công ty 3L1K");
        valueMap.put("CompanyStreetAdress", "32 Ngô Quyền P2 Q10");
        valueMap.put("CompanyCityAndZIP", "TPHCM");
        valueMap.put("CompanyPhone", "0784282798");
        valueMap.put("number", String.valueOf(order.getId()));
        Date orderDate = order.getOrderDate();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String formattedDate = sdf.format(orderDate);
        valueMap.put("date", formattedDate);
        valueMap.put("BillToName", order.getUser().getFirstName() + " " + order.getUser().getLastName());
        valueMap.put("BillToStreetAddress", order.getUser().getAddress());
        valueMap.put("BillToPhone", order.getUser().getTel());
        valueMap.put("BillToEmail", order.getUser().getEmail());
        valueMap.put("shipRate", String.valueOf(order.getShippingFee()));
        valueMap.put("ContactName", "Huy Lương");
        valueMap.put("ContactPhone", "0764282798");
        valueMap.put("ContactEmail", "huyluong@gmail.com");
        valueMap.put("totalPrice", String.valueOf(order.getOrderDetails().stream().mapToDouble(detail -> detail.getQuantity() * detail.getUnitPrice())
                .sum()));
        valueMap.put("total", String.valueOf(order.getTotalPrice()));
        return valueMap;
    }

}
