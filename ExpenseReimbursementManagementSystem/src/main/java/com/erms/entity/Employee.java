package com.erms.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


@Entity
public class Employee {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message="Name Field Cannot be empty")
	@Column(nullable = false)
	private String name;
	
	@Email
	@Column(unique = true,nullable=false)
	private String email;
	private String department;
	private LocalDateTime createdAt;
//	@NotBlank
//	private String pwd;
//	
	@Enumerated (EnumType.STRING)
	private Role role;
	
	
	public Employee() {}

	
	public Employee(Long id, @NotBlank(message = "Name Field Cannot be empty") String name, @Email String email,
			String department, LocalDateTime createdAt, @NotBlank Role role) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.department = department;
		this.createdAt = createdAt;
//		this.pwd = pwd;
		this.role = role;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}


//	public String getPwd() {
//		return pwd;
//	}
//
//
//	public void setPwd(String pwd) {
//		this.pwd = pwd;
//	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}
	
	
	
	
	
}
