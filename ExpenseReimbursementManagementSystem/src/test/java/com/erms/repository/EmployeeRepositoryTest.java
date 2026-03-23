
package com.erms.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.erms.entity.Employee;
import com.erms.entity.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepo employeeRepo;

    @BeforeEach
    void cleanDatabase() {
        employeeRepo.deleteAll(); // fresh start for each test
    }

    @Test
    void testSaveAndFindById() {
        Employee emp = new Employee();
        emp.setName("John Doe");
        emp.setEmail("john@example.com");
        emp.setDepartment("IT");
//        emp.setPwd("password123");
        emp.setRole(Role.ADMIN); // assuming Role enum exists
        emp.setCreatedAt(LocalDateTime.now());

        Employee saved = employeeRepo.save(emp);

        Optional<Employee> fetched = employeeRepo.findById(saved.getId());
        assertTrue(fetched.isPresent());
        assertEquals("John Doe", fetched.get().getName());
    }

    @Test
    void testFindAll() {
        Employee emp1 = new Employee();
        emp1.setName("Alice");
        emp1.setEmail("alice@example.com");
        emp1.setDepartment("HR");
//        emp1.setPwd("pwd1");
        emp1.setRole(Role.EMPLOYEE);
        emp1.setCreatedAt(LocalDateTime.now());

        Employee emp2 = new Employee();
        emp2.setName("Bob");
        emp2.setEmail("bob@example.com");
        emp2.setDepartment("Finance");
//        emp2.setPwd("pwd2");
        emp2.setRole(Role.EMPLOYEE);
        emp2.setCreatedAt(LocalDateTime.now());

        employeeRepo.save(emp1);
        employeeRepo.save(emp2);

        List<Employee> employees = employeeRepo.findAll();
        assertEquals(2, employees.size());
    }

    @Test
    void testDeleteById() {
        Employee emp = new Employee();
        emp.setName("Eve");
        emp.setEmail("eve@example.com");
        emp.setDepartment("Support");
//        emp.setPwd("pwd3");
        emp.setRole(Role.EMPLOYEE);
        emp.setCreatedAt(LocalDateTime.now());

        Employee saved = employeeRepo.save(emp);
        employeeRepo.deleteById(saved.getId());

        Optional<Employee> fetched = employeeRepo.findById(saved.getId());
        assertFalse(fetched.isPresent());
    }
}
