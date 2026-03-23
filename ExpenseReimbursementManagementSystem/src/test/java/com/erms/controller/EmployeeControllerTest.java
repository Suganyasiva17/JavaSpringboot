package com.erms.controller;

import com.erms.entity.Employee;
import com.erms.entity.Role;
import com.erms.service.EmployeeService;

import tools.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class EmployeeControllerTest {

    private MockMvc mockMvc;

    @Mock
    private EmployeeService employeeService;

    @InjectMocks
    private EmployeeController employeeController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(employeeController).build();
    }

    @Test
    void testGetAllEmployee() throws Exception {
        Employee emp1 = new Employee(1L, "Alice", "alice@example.com", "HR", LocalDateTime.now(), Role.ADMIN);
        Employee emp2 = new Employee(2L, "Bob", "bob@example.com", "IT", LocalDateTime.now(), Role.EMPLOYEE);

        List<Employee> employees = Arrays.asList(emp1, emp2);
        when(employeeService.getAllEmployees()).thenReturn(employees);

        mockMvc.perform(get("/employee"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Alice"))
                .andExpect(jsonPath("$[1].name").value("Bob"));
    }

    @Test
    void testCreateEmployee() throws Exception {
        Employee emp = new Employee(1L, "Charlie", "charlie@example.com", "Finance", LocalDateTime.now(),  Role.EMPLOYEE);

        when(employeeService.createEmployee(any(Employee.class))).thenReturn(emp);

        mockMvc.perform(post("/employee")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emp)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Charlie"))
                .andExpect(jsonPath("$.email").value("charlie@example.com"));
    }

    @Test
    void testGetEmployeeById() throws Exception {
        Employee emp = new Employee(1L, "Dave", "dave@example.com", "Marketing", LocalDateTime.now(), Role.ADMIN);
        when(employeeService.getEmployeeById(1L)).thenReturn(emp);

        mockMvc.perform(get("/employee/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Dave"))
                .andExpect(jsonPath("$.email").value("dave@example.com"));
    }

    @Test
    void testUpdateEmployee() throws Exception {
        Employee updated = new Employee(1L, "Eve", "eve@example.com", "Support", LocalDateTime.now(),  Role.EMPLOYEE);
        when(employeeService.updateEmployee(eq(1L), any(Employee.class))).thenReturn(updated);

        mockMvc.perform(put("/employee/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Eve"))
                .andExpect(jsonPath("$.email").value("eve@example.com"));
    }

    @Test
    void testDeleteEmployee() throws Exception {
        doNothing().when(employeeService).deleteEmployee(1L);

        mockMvc.perform(delete("/employee/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Employee deleted successfully"));
    }
}