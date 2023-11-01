package com.example.quanlybanaobackend.constant;

public class Constant {
    public enum UserStatus {
        ACTIVE, INACTIVE, BANNED
    }

    public enum Gender {
        MALE, FEMALE, NON_BINARY
    }

    public enum Color {
        RED, BLUE, YELLOW, GREEN
    }

    public enum OrderStatus {
        ACTIVE, UNACTIVE
    }

    public enum ShipStatus {
        APPROVAL, SHIPPING, SHIPPED
    }

    public enum PaymentMethod {
        CASH, BANKING
    }
    public enum PaymentStatus {
        PAID, UNPAID
    }
}
