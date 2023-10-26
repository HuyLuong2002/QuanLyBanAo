package com.example.quanlybanaobackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@SpringBootApplication()
@ComponentScan(basePackages = {"com.example.quanlybanaobackend.repository", "com.example.quanlybanaobackend"})
public class QuanLyBanAoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuanLyBanAoBackendApplication.class, args);
	}

}
