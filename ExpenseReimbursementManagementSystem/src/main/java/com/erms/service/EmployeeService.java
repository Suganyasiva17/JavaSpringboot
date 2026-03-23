package com.erms.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.erms.entity.Employee;
import com.erms.repository.EmployeeRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmployeeService {

	private EmployeeRepo employeeRepo;

	public EmployeeService(EmployeeRepo employeeRepo) {
		super();
		this.employeeRepo = employeeRepo;
	}
	
	public Employee createEmployee(Employee employee) {
		employee.setCreatedAt(LocalDateTime.now());
		return employeeRepo.save(employee);
	}
	
	public List<Employee> getAllEmployees(){
		return employeeRepo.findAll();
		}
	
	public Employee getEmployeeById(Long id) {
		return employeeRepo.findById(id).orElseThrow(()->new EntityNotFoundException("Employee Not found with id: "+id));
		
	}
	
	public Employee updateEmployee(Long id, Employee updatedEmployee) {
		Employee existing=getEmployeeById(id);
		existing.setName(updatedEmployee.getName());
		existing.setDepartment(updatedEmployee.getDepartment());
		existing.setEmail(updatedEmployee.getEmail());
		
		return employeeRepo.save(existing);
	}
	
	public void deleteEmployee(Long id) {
		if(!employeeRepo.existsById(id)) {
			throw new EntityNotFoundException("EMployee Not Found with id: "+id);
			
		}
		employeeRepo.deleteById(id);
	}
	
	
	
	
}


