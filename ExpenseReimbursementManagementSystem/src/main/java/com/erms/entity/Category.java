package com.erms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Category {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Category Name is required")
	@Column(nullable =false)
	private String categoryName;
	
	private String categoryDescription;
	
	

	public Category() {

	}



	public Category(Long id, @NotBlank(message = "Category Name is required") String categoryName,
			String categoryDescription) {
		
		this.id = id;
		this.categoryName = categoryName;
		this.categoryDescription = categoryDescription;
	}



	public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getCategoryName() {
		return categoryName;
	}



	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}



	public String getCategoryDescription() {
		return categoryDescription;
	}



	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}
	
	
	
	
	
	
	
}
