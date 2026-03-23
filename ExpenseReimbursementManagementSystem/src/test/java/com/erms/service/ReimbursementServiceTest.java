package com.erms.service;

import static org.junit.jupiter.api.Assertions.*;

import java.math.BigDecimal;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.erms.entity.Category;
import com.erms.entity.Employee;
import com.erms.entity.Reimbursement;
import com.erms.entity.ReimbursementStatus;
import com.erms.repository.CategoryRepo;
import com.erms.repository.EmployeeRepo;

@SpringBootTest
public class ReimbursementServiceTest {

    @Autowired
    private ReimbursementService reimbursementService;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    private Employee employee;
    private Category category;

    @BeforeEach
    public void setup() {
        // Create an employee
        employee = new Employee();
        employee.setName("John Doe");
        employee.setEmail("john@example.com");
        employee.setDepartment("IT");
//        employee.setPwd("password");
        employee = employeeRepo.save(employee);

        // Create a category
        category = new Category();
        category.setCategoryName("Travel");
        category = categoryRepo.save(category);
    }

    @Test
    public void testCreateReimbursement() {
        Reimbursement reimbursement = new Reimbursement();
        reimbursement.setDescription("Taxi fare");
        reimbursement.setRequestedAmount(BigDecimal.valueOf(50));

        Reimbursement saved = reimbursementService.createReimbursement(reimbursement, employee.getId(), category.getId());

        // Basic assertions
        assertNotNull(saved.getId(), "Reimbursement ID should not be null");
        assertEquals(employee.getId(), saved.getEmployee().getId(), "Employee ID should match");
        assertEquals(category.getId(), saved.getCategory().getId(), "Category ID should match");
        assertEquals(BigDecimal.valueOf(50), saved.getRequestedAmount(), "Requested amount should match");
        assertEquals(ReimbursementStatus.PENDING, saved.getStatus(), "Initial status should be PENDING");
    }
}