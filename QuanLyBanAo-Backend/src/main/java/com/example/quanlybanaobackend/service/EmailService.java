package com.example.quanlybanaobackend.service;

import com.example.quanlybanaobackend.model.EmailDetails;

public interface EmailService {

    String sendSimpleMail(EmailDetails details);
    String sendMailWithAttachment(EmailDetails details);
}
