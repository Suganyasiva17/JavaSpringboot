package com.erms.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.erms.entity.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.util.List;
import java.util.Optional;

@DataJpaTest 
public class CategoryRepoTets {

    @Autowired
    private CategoryRepo categoryRepo;

    @Test
    void testSaveAndFindById() {
        Category category = new Category();
        category.setCategoryName("Electronics");
        category.setCategoryDescription("Electronic items");

        // Save category
        Category saved = categoryRepo.save(category);

        // Fetch by ID
        Optional<Category> fetched = categoryRepo.findById(saved.getId());

        assertTrue(fetched.isPresent());
        assertEquals("Electronics", fetched.get().getCategoryName());
    }

    @Test
    void testFindAll() {
        Category cat1 = new Category();
        cat1.setCategoryName("Books");
        cat1.setCategoryDescription("All books");

        Category cat2 = new Category();
        cat2.setCategoryName("Gadgets");
        cat2.setCategoryDescription("All gadgets");

        categoryRepo.save(cat1);
        categoryRepo.save(cat2);

        List<Category> categories = categoryRepo.findAll();

        assertEquals(2, categories.size()); // Always 2 because H2 starts clean
    }

    @Test
    void testDeleteById() {
        Category category = new Category();
        category.setCategoryName("Clothing");
        category.setCategoryDescription("All clothing");

        Category saved = categoryRepo.save(category);

        categoryRepo.deleteById(saved.getId());

        Optional<Category> fetched = categoryRepo.findById(saved.getId());
        assertFalse(fetched.isPresent());
    }
}