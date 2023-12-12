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
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

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
    public Order deleteOrder(int id) {
        Order removeOrder = findById(id);
        if (removeOrder.getOrderStatus() == Constant.OrderStatus.ACTIVE)
            removeOrder.setOrderStatus(Constant.OrderStatus.INACTIVE);
        else removeOrder.setOrderStatus(Constant.OrderStatus.ACTIVE);
        return orderRepository.save(removeOrder);
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
    public Order approveOrder(int id, User user) {
        Order order = findById(id);
        order.setShipStatus(Constant.ShipStatus.SHIPPING);
        order.setEmployee(user);
        return orderRepository.save(order);
    }

    @Override
    public Order rejectOrder(int id, User user) {
        Order order = findById(id);
        order.setShipStatus(Constant.ShipStatus.CANCELED);
//        order.setOrderStatus(Constant.OrderStatus.INACTIVE);
        order.setEmployee(user);
        return orderRepository.save(order);
    }


    @Override
    public boolean exportDataExcel(int id, String templatePath, String outputPath) throws IOException, ParseException, InterruptedException {
        Order order = findById(id);
        if (order == null) {
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

    @Override
    public boolean exportDataPDF(int id, String outputPath) throws IOException, DocumentException {
        Order order = findById(id);
        if (order == null) {
            return false;
        }
        // Tạo đối tượng Date để lấy thời gian hiện tại
        Date now = new Date();
        // Sử dụng định dạng thời gian để tạo tên tệp duy nhất
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH-mm-ss");
        String timeStamp = dateFormat.format(now);
        // Tạo tên tệp đích dựa trên thời gian
        String fileName = "Invoice_" + timeStamp + ".pdf";
        String filePath = outputPath + File.separator + fileName;

        // Bắt đầu tạo và ghi nội dung vào file PDF
        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream(filePath));

        document.open();
        // Thêm nội dung vào tài liệu PDF dựa trên dữ liệu hóa đơn
        addContentToPdf(document, order);
        document.close();
        return true;

    }

    private void addContentToPdf(Document document, Order order) throws DocumentException, IOException {
        // Sử dụng font Unicode tiếng Việt (VnTime)
        BaseFont unicodeFont = BaseFont.createFont("font/ARIALUNI.TTF", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
        com.itextpdf.text.Font font = new com.itextpdf.text.Font(unicodeFont, 12);
        com.itextpdf.text.Font fontTable = new com.itextpdf.text.Font(unicodeFont, 12, com.itextpdf.text.Font.BOLD);
        com.itextpdf.text.Font fontTitle = new com.itextpdf.text.Font(unicodeFont, 12, com.itextpdf.text.Font.BOLD);
        com.itextpdf.text.Font fontHeader = new com.itextpdf.text.Font(unicodeFont, 16, com.itextpdf.text.Font.BOLD);
        // Định dạng lại ngày tháng năm
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        // Thêm nội dung vào tài liệu PDF dựa trên dữ liệu hóa đơn
        String line1 = "Cửa hàng 3L1K";
        String line2 = "Địa chỉ: 32 Ngô Quyền P2 Q10";
        String line3 = "Số điện thoại: 0953656315";
        String line4 = "HÓA ĐƠN BÁN HÀNG";
        String line5 = "Mã hóa đơn: ";
        String line6 = "Ngày xuất hóa đơn: ";
        String line7 = "Ngày đặt ";
        String line8 = "Thông tin khách hàng";
        String line9 = "Khách hàng: ";
        String line10 = "Địa chỉ: ";
        String line11 = "Số điện thoại: ";
        String line12 = "Phí vận chuyển: ";
        String line13 = "Tổng tiền thanh toán: ";
        document.add(new Paragraph(line1, font));
        document.add(new Paragraph(line2, font));
        document.add(new Paragraph(line3, font));
        Paragraph title = new Paragraph(line4, fontHeader);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingBefore(12f);
        title.setSpacingAfter(12f);
        document.add(title);
        document.add(new Paragraph(line5 + order.getId(), font));
        document.add(new Paragraph(line6 + dateFormat.format(new Date()), font));
        document.add(new Paragraph(line7 + dateFormat.format(order.getOrderDate()), font));
        Paragraph customerTitle = new Paragraph(line8, fontTitle);
        customerTitle.setSpacingBefore(12f);
        document.add(customerTitle);
        document.add(new Paragraph(line9 + order.getUser().getFirstName() + " " + order.getUser().getLastName(), font));
        document.add(new Paragraph(line10 + order.getUser().getAddress(), font));
        document.add(new Paragraph(line11 + order.getUser().getTel(), font));

        //------------Xử lý tạo bảng ds sản phẩm---------------
        // Thêm bảng sản phẩm vào tài liệu
        PdfPTable table = new PdfPTable(5); // 5 cột
        table.setWidthPercentage(100); // Chiều rộng của bảng là 100% của trang
        table.setSpacingBefore(12f); // Khoảng cách giữa bảng và nội dung trước đó

        // Thêm header cho bảng
        addTableHeader(table, fontTable);
        // Thêm dữ liệu sản phẩm từ đơn hàng vào bảng
        addRows(table, order, font);
        // Thêm bảng vào tài liệu
        document.add(table);

        document.add(new Paragraph(line12 + order.getShippingFee(), font));
        document.add(new Paragraph(line13 + order.getTotalPrice() + " " + "(Đã bao gồm thuế VAT + phí vận chuyển)", font));
    }
    private void addTableHeader(PdfPTable table, com.itextpdf.text.Font font) {
        String[] headers = {"Tên sản phẩm", "ĐVT", "SL", "Đơn giá", "Thành tiền"};
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setPadding(5); // Điều chỉnh khoảng cách giữa nội dung và viền của ô
            table.addCell(cell);
        }
    }

    private void addRows(PdfPTable table, Order order, com.itextpdf.text.Font font) {
        String dvt = "Cái";
        // Thêm dữ liệu sản phẩm từ đơn hàng vào bảng
        for (OrderDetail orderDetail : order.getOrderDetails()) {
            PdfPCell cellProductName = new PdfPCell(new Phrase(orderDetail.getProduct().getName(), font));
            cellProductName.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellProductName.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cellProductName.setPadding(5); // Điều chỉnh khoảng cách giữa nội dung và viền của ô
            table.addCell(cellProductName);

            PdfPCell cellDvt = new PdfPCell(new Phrase(dvt, font));
            cellDvt.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellDvt.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cellDvt.setPadding(5);
            table.addCell(cellDvt);

            PdfPCell cellQuantity = new PdfPCell(new Phrase(String.valueOf(orderDetail.getQuantity()), font));
            cellQuantity.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellQuantity.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cellQuantity.setPadding(5);
            table.addCell(cellQuantity);

            PdfPCell cellUnitPrice = new PdfPCell(new Phrase(String.valueOf(orderDetail.getUnitPrice()), font));
            cellUnitPrice.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellUnitPrice.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cellUnitPrice.setPadding(5);
            table.addCell(cellUnitPrice);

            PdfPCell cellTotal = new PdfPCell(new Phrase(String.valueOf(orderDetail.getQuantity() * orderDetail.getUnitPrice()), font));
            cellTotal.setHorizontalAlignment(Element.ALIGN_CENTER);
            cellTotal.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cellTotal.setPadding(5);
            table.addCell(cellTotal);
        }
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
