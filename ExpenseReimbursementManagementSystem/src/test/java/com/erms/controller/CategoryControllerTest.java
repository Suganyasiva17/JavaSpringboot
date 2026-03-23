package com.erms.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import com.erms.entity.Category;
import com.erms.service.CategoryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class CategoryControllerTest {

    @Mock
    private CategoryService categoryService; // Fake service

    @InjectMocks
    private CategoryController categoryController; // Controller we are testing

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    void testCreateCategory() {
        Category category = new Category(1L, "Electronics", "Electronic items");

        when(categoryService.createCategory(category)).thenReturn(category);

        Category result = categoryController.createCategory(category);

        assertEquals("Electronics", result.getCategoryName());
        assertEquals("Electronic items", result.getCategoryDescription());
        verify(categoryService).createCategory(category);
    }

    @Test
    void testGetAllCategory() {
        Category category1 = new Category(1L, "Electronics", "Electronic items");
        Category category2 = new Category(2L, "Books", "All kinds of books");

        when(categoryService.getAllCategory()).thenReturn(Arrays.asList(category1, category2));

        List<Category> categories = categoryController.getAllCategory();

        assertEquals(2, categories.size());
        verify(categoryService).getAllCategory();
    }

    @Test
    void testGetCategoryById() {
        Category category = new Category(1L, "Electronics", "Electronic items");

        when(categoryService.getCategoryById(1L)).thenReturn(category);

        Category result = categoryController.getCategoryById(1L);

        assertEquals("Electronics", result.getCategoryName());
        verify(categoryService).getCategoryById(1L);
    }

    @Test
    void testUpdateCategoryById() {
        Category updatedCategory = new Category(1L, "Gadgets", "All gadgets");

        when(categoryService.updateCategoryById(1L, updatedCategory)).thenReturn(updatedCategory);

        Category result = categoryController.updateCategoryById(1L, updatedCategory);

        assertEquals("Gadgets", result.getCategoryName());
        verify(categoryService).updateCategoryById(1L, updatedCategory);
    }

    @Test
    void testDeleteCategoryById() {
        doNothing().when(categoryService).deleteCategory(1L);

        String result = categoryController.deleteCategoryById(1L);

        assertEquals("Category Deleted Successfully", result);
        verify(categoryService).deleteCategory(1L);
    }
}