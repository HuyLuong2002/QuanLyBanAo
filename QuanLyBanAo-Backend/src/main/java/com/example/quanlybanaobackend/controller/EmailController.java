package com.example.quanlybanaobackend.controller;

import com.example.quanlybanaobackend.model.EmailDetails;
import com.example.quanlybanaobackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    public String sendMail(EmailDetails details) {
        String status
                = emailService.sendSimpleMail(details);

        return status;
    }
}
