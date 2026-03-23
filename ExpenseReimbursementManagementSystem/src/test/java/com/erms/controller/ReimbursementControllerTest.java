package com.erms.controller;

import com.erms.entity.*;
import com.erms.repository.*;

import tools.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ReimbursementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ReimbursementRepo reimbursementRepo;

    @Autowired
    private ObjectMapper objectMapper;

    private Employee employee;
    private Category category;

    @BeforeEach
    public void setup() {
        reimbursementRepo.deleteAll();
        employeeRepo.deleteAll();
        categoryRepo.deleteAll();

        employee = new Employee();
        employee.setName("Alice");
        employee.setEmail("alice@example.com");
        employee.setDepartment("Finance");
//        employee.setPwd("password");
        employee.setRole(Role.EMPLOYEE);
        employee.setCreatedAt(LocalDateTime.now());
        employee = employeeRepo.save(employee);

        category = new Category();
        category.setCategoryName("Food");
        category = categoryRepo.save(category);
    }

    @Test
    public void testCreateReimbursementEndpoint() throws Exception {
        Reimbursement r = new Reimbursement();
        r.setDescription("Lunch with client");
        r.setRequestedAmount(BigDecimal.valueOf(150));

        mockMvc.perform(post("/reimbursement/{employeeId}/{categoryId}", employee.getId(), category.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(r)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.employee.id").value(employee.getId()))
                .andExpect(jsonPath("$.category.id").value(category.getId()))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }
}