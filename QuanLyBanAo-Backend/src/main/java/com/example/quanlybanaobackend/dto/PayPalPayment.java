package com.example.quanlybanaobackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class PayPalPayment {
    private String create_time;
    private List<Link> links;
    private String id;
    private String state;
    private List<Transaction> transactions;
    private String intent;
    private Payer payer;
    private String cart;

    // getters and setters...

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Link {
        private String method;
        private String rel;
        private String href;

        // getters and setters...
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Transaction {
        private Payee payee;
        private Amount amount;
        private List<RelatedResource> related_resources;
        private ItemList item_list;

        // getters and setters...
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Payee {
        private String merchant_id;

        // getters and setters...
    }

    static class Amount {
        private String total;
        private String currency;
        private Details details;

        // getters and setters...
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Details {
        // Any additional details...

        // getters and setters...
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class RelatedResource {
        private Order order;

        // getters and setters...
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Order {
        private String reason_code;
        private String parent_payment;
        private Amount amount;
        private String update_time;
        private String create_time;
        private List<Link> links;
        private String id;
        private String state;

        // getters and setters...
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class ItemList {
        private ShippingAddress shipping_address;

        // getters and setters...
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class ShippingAddress {
        private String country_code;
        private String city;
        private String state;
        private String recipient_name;
        private String postal_code;
        private String line1;

        // getters and setters...
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Payer {
        private String payment_method;
        private String status;
        private PayerInfo payer_info;

        // getters and setters...
    }
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class PayerInfo {
        private String country_code;
        private String last_name;
        private String payer_id;
        private ShippingAddress shipping_address;
        private String first_name;
        private String email;

        // getters and setters...
    }
}
