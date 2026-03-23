package com.erms.controller;



import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erms.entity.Category;
import com.erms.service.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins="*")
public class CategoryController {
	 private final CategoryService categoryService;

	 public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	 }
	 @PostMapping
	 public Category createCategory(@RequestBody Category category) {
		 return categoryService.createCategory(category);
	 }
	 
	 @GetMapping
	 public List<Category> getAllCategory(){
		 return categoryService.getAllCategory();
	 }
	 @GetMapping("/{id}")
	 public Category getCategoryById(@PathVariable Long id) {
		 return categoryService.getCategoryById(id);
	 }
	 
	 @PutMapping("/{id}")
	 public Category updateCategoryById(@PathVariable Long id, @RequestBody Category updatedCategory) {
		 return categoryService.updateCategoryById(id,updatedCategory);
	 }
	 
	 @DeleteMapping("/{id}")
	 public String deleteCategoryById(@PathVariable Long id) {
		 categoryService.deleteCategory(id);
		 return "Category Deleted Successfully";
	 }
	 
	 
	
}
