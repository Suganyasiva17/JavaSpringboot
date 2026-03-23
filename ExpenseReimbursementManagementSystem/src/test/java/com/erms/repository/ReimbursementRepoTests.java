package com.erms.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;

import com.erms.entity.Category;
import com.erms.entity.Employee;
import com.erms.entity.Reimbursement;
import com.erms.entity.Role;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;


@DataJpaTest
@AutoConfigureTestDatabase
(replace = AutoConfigureTestDatabase.Replace.NONE)
class ReimbursementRepoTests {

    @Autowired
    private ReimbursementRepo reimbursementRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    private Employee employee;
    private Category category;

    @BeforeEach
    void setup() {
        employee = employeeRepo.save(new Employee(null, "John Doe", "john@example.com", "IT", LocalDateTime.now(), Role.EMPLOYEE));
        category = categoryRepo.save(new Category(null, "Travel", "Travel Expenses"));
    }

    @Test
    void testCreateReimbursement() {
        Reimbursement r = new Reimbursement();
        r.setEmployee(employee);
        r.setCategory(category);
        r.setDescription("Taxi Fare");
        r.setRequestedAmount(new BigDecimal("100"));
        
        Reimbursement saved = reimbursementRepo.save(r);
        assertNotNull(saved.getId());
        assertEquals(employee.getId(), saved.getEmployee().getId());
        assertEquals(category.getId(), saved.getCategory().getId());
    }
}