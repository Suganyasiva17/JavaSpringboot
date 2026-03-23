package com.erms.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erms.entity.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long>{
	
}
