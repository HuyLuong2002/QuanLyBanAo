package com.example.quanlybanaobackend.constant;

public class Constant {
    public enum UserStatus {
        ACTIVE, INACTIVE
    }

    public enum Gender {
        MALE, FEMALE, NON_BINARY
    }

    public enum Color {
        RED, BLUE, YELLOW, GREEN
    }

    public enum OrderStatus {
        ACTIVE, INACTIVE
    }

    public enum ShipStatus {
        APPROVAL, SHIPPING, SHIPPED, CANCELED
    }

    public enum PaymentMethod {
        CASH, BANKING
    }
    public enum PaymentStatus {
        PAID, UNPAID
    }
}
