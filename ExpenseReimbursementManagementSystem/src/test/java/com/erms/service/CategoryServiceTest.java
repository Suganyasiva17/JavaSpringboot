package com.erms.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.erms.entity.Category;
import com.erms.repository.CategoryRepo;

import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class CategoryServiceTest {

    @Mock
    private CategoryRepo categoryRepo; // Fake repository

    @InjectMocks
    private CategoryService categoryService; // Service we are testing

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    void testCreateCategory() {
        Category category = new Category(1L, "Electronics", "Electronic items");

        when(categoryRepo.save(category)).thenReturn(category);

        Category result = categoryService.createCategory(category);

        assertEquals("Electronics", result.getCategoryName());
        verify(categoryRepo).save(category);
    }

    @Test
    void testGetCategoryById() {
        Category category = new Category(1L, "Books", "All books");

        when(categoryRepo.findById(1L)).thenReturn(Optional.of(category));

        Category result = categoryService.getCategoryById(1L);

        assertEquals("Books", result.getCategoryName());
        verify(categoryRepo).findById(1L);
    }

    @Test
    void testGetCategoryById_NotFound() {
        when(categoryRepo.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EntityNotFoundException.class, () -> {
            categoryService.getCategoryById(1L);
        });

        assertTrue(exception.getMessage().contains("Category not found with ID"));
        verify(categoryRepo).findById(1L);
    }

    @Test
    void testGetAllCategory() {
        Category category1 = new Category(1L, "Electronics", "Electronic items");
        Category category2 = new Category(2L, "Books", "All books");

        when(categoryRepo.findAll()).thenReturn(Arrays.asList(category1, category2));

        List<Category> categories = categoryService.getAllCategory();

        assertEquals(2, categories.size());
        verify(categoryRepo).findAll();
    }

    @Test
    void testUpdateCategoryById() {
        Category existing = new Category(1L, "Electronics", "Electronic items");
        Category updated = new Category(1L, "Gadgets", "All gadgets");

        when(categoryRepo.findById(1L)).thenReturn(Optional.of(existing));

        Category result = categoryService.updateCategoryById(1L, updated);

        assertEquals("Gadgets", result.getCategoryName());
        assertEquals("All gadgets", result.getCategoryDescription());
        verify(categoryRepo).findById(1L);
    }

    @Test
    void testDeleteCategory() {
        when(categoryRepo.existsById(1L)).thenReturn(true);
        doNothing().when(categoryRepo).deleteById(1L);

        assertDoesNotThrow(() -> categoryService.deleteCategory(1L));

        verify(categoryRepo).existsById(1L);
        verify(categoryRepo).deleteById(1L);
    }

    @Test
    void testDeleteCategory_NotFound() {
        when(categoryRepo.existsById(1L)).thenReturn(false);

        Exception exception = assertThrows(EntityNotFoundException.class, () -> {
            categoryService.deleteCategory(1L);
        });

        assertTrue(exception.getMessage().contains("Category Not Found with ID"));
        verify(categoryRepo).existsById(1L);
    }
}