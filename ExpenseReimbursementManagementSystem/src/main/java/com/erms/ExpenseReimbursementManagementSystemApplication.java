package com.erms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.erms")
public class ExpenseReimbursementManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseReimbursementManagementSystemApplication.class, args);
		
	}

}
