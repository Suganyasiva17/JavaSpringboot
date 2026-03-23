package com.erms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.erms.entity.Category;
import com.erms.repository.CategoryRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService {
	private final CategoryRepo categoryRepo;

	public CategoryService(CategoryRepo categoryRepo) {
		this.categoryRepo = categoryRepo;
	}
	
	public Category createCategory(Category category) {
		return categoryRepo.save(category);
	}
	
	public Category getCategoryById(Long id) {
		return categoryRepo.findById(id).orElseThrow(()-> new EntityNotFoundException("Category not found with ID"+id));
	}
	
	public List<Category> getAllCategory(){
		return categoryRepo.findAll();
	}
	
	public Category updateCategoryById(Long id, Category updated) {
		Category existingCategory=getCategoryById(id);
		existingCategory.setCategoryName(updated.getCategoryName());
		existingCategory.setCategoryDescription(updated.getCategoryDescription());
		return existingCategory;
		
	}
	
	public void deleteCategory(Long id) {
		if(!categoryRepo.existsById(id)) {
			throw new EntityNotFoundException("Category Not Found with ID "+id);
		}
		categoryRepo.deleteById(id);
		
	}
	
	
	
	
	

}
