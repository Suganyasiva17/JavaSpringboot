package com.erms.service;

import com.erms.entity.Employee;
import com.erms.entity.Role;
import com.erms.repository.EmployeeRepo;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class EmployeeServiceTest {

    @Mock
    private EmployeeRepo employeeRepo;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee emp;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        emp = new Employee(1L, "John", null, null, LocalDateTime.now(), Role.EMPLOYEE);
    }

    @Test
    void testCreateEmployee() {
        when(employeeRepo.save(any(Employee.class))).thenReturn(emp);

        Employee saved = employeeService.createEmployee(emp);

        assertNotNull(saved);
        verify(employeeRepo, times(1)).save(emp);
    }

    @Test
    void testGetAllEmployees() {
        when(employeeRepo.findAll()).thenReturn(List.of(emp));

        assertEquals(1, employeeService.getAllEmployees().size());
    }

    @Test
    void testGetEmployeeById_Success() {
        when(employeeRepo.findById(1L)).thenReturn(Optional.of(emp));

        Employee found = employeeService.getEmployeeById(1L);

        assertEquals("John", found.getName());
    }

    @Test
    void testGetEmployeeById_NotFound() {
        when(employeeRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            employeeService.getEmployeeById(1L);
        });
    }

    @Test
    void testUpdateEmployee() {
        Employee updated = new Employee(1L, "Sam", "sam@mail.com", "HR",
                LocalDateTime.now(), Role.EMPLOYEE);

        when(employeeRepo.findById(1L)).thenReturn(Optional.of(emp));
        when(employeeRepo.save(any(Employee.class))).thenReturn(updated);

        Employee result = employeeService.updateEmployee(1L, updated);

        assertEquals("Sam", result.getName());
        assertEquals("HR", result.getDepartment());
    }

    @Test
    void testDeleteEmployee_Success() {
        when(employeeRepo.existsById(1L)).thenReturn(true);

        employeeService.deleteEmployee(1L);

        verify(employeeRepo, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteEmployee_NotFound() {
        when(employeeRepo.existsById(1L)).thenReturn(false);

        assertThrows(EntityNotFoundException.class, () -> {
            employeeService.deleteEmployee(1L);
        });
    }
}