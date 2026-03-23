package com.erms.service;	
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.erms.entity.Category;
import com.erms.entity.Employee;
import com.erms.entity.Reimbursement;
import com.erms.entity.ReimbursementStatus;
import com.erms.repository.CategoryRepo;
import com.erms.repository.EmployeeRepo;
import com.erms.repository.ReimbursementRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ReimbursementService {

    private final ReimbursementRepo repo;
    private final EmployeeRepo employeeRepo;
    private final CategoryRepo categoryRepo;

    public ReimbursementService(ReimbursementRepo repo,
                                EmployeeRepo employeeRepo,
                                CategoryRepo categoryRepo) {

        this.repo = repo;
        this.employeeRepo = employeeRepo;
        this.categoryRepo = categoryRepo;
    }

    
    public Reimbursement createReimbursement(Reimbursement reimbursement, Long employeeId, Long categoryId) {

        Employee emp = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + employeeId));

        Category cat = categoryRepo.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Category not found: " + categoryId));

        reimbursement.setEmployee(emp);
        reimbursement.setCategory(cat);
        reimbursement.setRequestedAt(LocalDateTime.now());
        reimbursement.setStatus(ReimbursementStatus.PENDING);

        return repo.save(reimbursement);
    }

    
    public Reimbursement getReimbursementById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reimbursement not found: " + id));
    }

   
    public List<Reimbursement> getAllReimbursement() {
        return repo.findAll();
    }

  
    public Reimbursement updateReimbursementById(Long id, Reimbursement updated) {

        Reimbursement existing = getReimbursementById(id);

        existing.setDescription(updated.getDescription());
        existing.setRequestedAmount(updated.getRequestedAmount());
        existing.setApprovedAmount(updated.getApprovedAmount());
        existing.setStatus(updated.getStatus());

        if (updated.getStatus() == ReimbursementStatus.APPROVED) {

            if (updated.getApprovedAmount().compareTo(updated.getRequestedAmount()) > 0) {
                throw new IllegalArgumentException("Approved amount cannot exceed requested amount");
            }

            existing.setApprovedAt(LocalDateTime.now());
        }

        return repo.save(existing);
    }

        public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Reimbursement not found: " + id);
        }
        repo.deleteById(id);
    }

    
    public BigDecimal getEmployeeTotalRequested(Long employeeId) {
        return repo.findByEmployeeId(employeeId).stream()
                .map(r -> r.getRequestedAmount() != null ? r.getRequestedAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getEmployeeTotalApproved(Long employeeId) {
        return repo.findByEmployeeIdAndStatus(employeeId, ReimbursementStatus.APPROVED).stream()
                .map(r -> r.getApprovedAmount() != null ? r.getApprovedAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Map<String, BigDecimal> getEmployeeCategoryTotals(Long employeeId) {
        return repo.findByEmployeeId(employeeId).stream()
                .filter(r -> r.getCategory() != null)
                .collect(Collectors.groupingBy(
                        r -> r.getCategory().getCategoryName(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                r -> r.getRequestedAmount() != null ? r.getRequestedAmount() : BigDecimal.ZERO,
                                BigDecimal::add
                        )
                ));
    }

    public BigDecimal getTotalRequestedAmount() {
        return repo.findAll().stream()
                .map(r -> r.getRequestedAmount() != null ? r.getRequestedAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getTotalApprovedAmount() {
        return repo.findByStatus(ReimbursementStatus.APPROVED).stream()
                .map(r -> r.getApprovedAmount() != null ? r.getApprovedAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Map<String, BigDecimal> getCategoryTotals() {
        return repo.findAll().stream()
                .filter(r -> r.getCategory() != null)
                .collect(Collectors.groupingBy(
                        r -> r.getCategory().getCategoryName(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                r -> r.getRequestedAmount() != null ? r.getRequestedAmount() : BigDecimal.ZERO,
                                BigDecimal::add
                        )
                ));
    }
}



//package com.erms.service;
//
//import java.math.BigDecimal;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import org.springframework.stereotype.Service;
//
//import com.erms.entity.Category;
//import com.erms.entity.Employee;
//import com.erms.entity.Reimbursement;
//import com.erms.entity.ReimbursementStatus;
//import com.erms.repository.CategoryRepo;
//import com.erms.repository.EmployeeRepo;
//import com.erms.repository.ReimbursementRepo;
//
//@Service
//public class ReimbursementService {
//
//    private final ReimbursementRepo repo;
//    private final EmployeeRepo employeeRepo;
//    private final CategoryRepo categoryRepo;
//
//    public ReimbursementService(ReimbursementRepo repo,
//                                EmployeeRepo employeeRepo,
//                                CategoryRepo categoryRepo) {
//        this.repo = repo;
//        this.employeeRepo = employeeRepo;
//        this.categoryRepo = categoryRepo;
//    }
//
//    // ---------------------- CRUD ------------------------
//
//    public Reimbursement createReimbursement(Reimbursement reimbursement, Long employeeId, Long categoryId) {
//        Employee emp = employeeRepo.findById(employeeId)
//                .orElseThrow(() -> new RuntimeException("Employee not found"));
//
//        Category cat = categoryRepo.findById(categoryId)
//                .orElseThrow(() -> new RuntimeException("Category not found"));
//
//        reimbursement.setEmployee(emp);
//        reimbursement.setCategory(cat);
//        return repo.save(reimbursement);
//    }
//
//    public Reimbursement getReimbursementById(Long id) {
//        return repo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Reimbursement not found"));
//    }
//
//    public List<Reimbursement> getAllReimbursement() {
//        return repo.findAll();
//    }
//
//    public Reimbursement updateReimbursementById(Long id, Reimbursement updateData) {
//        Reimbursement existing = getReimbursementById(id);
//
//        existing.setRequestedAmount(updateData.getRequestedAmount());
//        existing.setApprovedAmount(updateData.getApprovedAmount());
//        existing.setDescription(updateData.getDescription());
//        existing.setStatus(updateData.getStatus());
//        existing.setRequestedAt(updateData.getRequestedAt());
//        existing.setApprovedAt(updateData.getApprovedAt());
//
//        return repo.save(existing);
//    }
//
//    public void delete(Long id) {
//        repo.deleteById(id);
//    }
//
//    // ---------------------- STREAM OPERATIONS ------------------------
//
//    public BigDecimal getEmployeeTotalRequested(Long employeeId) {
//        return repo.findByEmployeeId(employeeId).stream()
//                .map(Reimbursement::getRequestedAmount)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//    }
//
//    public BigDecimal getEmployeeTotalApproved(Long employeeId) {
//        return repo.findByEmployeeIdAndStatus(employeeId, ReimbursementStatus.APPROVED).stream()
//                .map(Reimbursement::getApprovedAmount)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//    }
//
//    public Map<String, BigDecimal> getEmployeeCategoryTotals(Long employeeId) {
//        return repo.findByEmployeeId(employeeId).stream()
//                .collect(Collectors.groupingBy(
//                        r -> r.getCategory().getCategoryName(),
//                        Collectors.reducing(
//                                BigDecimal.ZERO,
//                                Reimbursement::getRequestedAmount,
//                                BigDecimal::add
//                        )
//                ));
//    }
//
//    public BigDecimal getTotalRequestedAmount() {
//        return repo.findAll().stream()
//                .map(Reimbursement::getRequestedAmount)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//    }
//
//    public BigDecimal getTotalApprovedAmount() {
//        return repo.findByStatus(ReimbursementStatus.APPROVED).stream()
//                .map(Reimbursement::getApprovedAmount)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//    }
//
//    public Map<String, BigDecimal> getCategoryTotals() {
//        return repo.findAll().stream()
//                .collect(Collectors.groupingBy(
//                        r -> r.getCategory().getCategoryName(),
//                        Collectors.reducing(
//                                BigDecimal.ZERO,
//                                Reimbursement::getRequestedAmount,
//                                BigDecimal::add
//                        )
//                ));
//    }
//}
//
//
////package com.erms.service;
////
////import java.time.LocalDateTime;
////import java.util.List;
////
////import org.springframework.stereotype.Service;
////import com.erms.ExpenseReimbursementManagementSystemApplication;
////import com.erms.entity.Category;
////import com.erms.entity.Employee;
////import com.erms.entity.Reimbursement;
////import com.erms.entity.ReimbursementStatus;
////import com.erms.repository.CategoryRepo;
////import com.erms.repository.EmployeeRepo;
////import com.erms.repository.ReimbursementRepo;
////
////import jakarta.persistence.EntityNotFoundException;
////
////@Service
////public class ReimbursementService {
////
////    
////
////   
////	private final ReimbursementRepo reimbursementRepo;
////	private final CategoryRepo categoryRepo;
////	private final EmployeeRepo employeeRepo;
////	
////	
////	public ReimbursementService(ReimbursementRepo reimbursementRepo, CategoryRepo categoryRepo,
////			EmployeeRepo employeeRepo) {
////		this.reimbursementRepo = reimbursementRepo;
////		this.categoryRepo = categoryRepo;
////		this.employeeRepo = employeeRepo;
////		
////		
////		
////	}
////
////	public Reimbursement createReimbursement(Reimbursement reImbursement, Long employeeId,Long categoryId) {
////		Employee employee=employeeRepo.findById(employeeId).orElseThrow(()->  new EntityNotFoundException("Employee with given EmployeeId not Found"));
////		Category category = categoryRepo.findById(categoryId).orElseThrow(()->  new EntityNotFoundException("Category Not Found"));
////		
////		reImbursement.setEmployee(employee);
////		reImbursement.setCategory(category);
////		reImbursement.setRequestedAt(LocalDateTime.now());
////		return reimbursementRepo.save(reImbursement);
////	}
////	
////	public List<Reimbursement> getAllReimbursement(){
////		return reimbursementRepo.findAll();
////	}
////	
////	public Reimbursement getReimbursementById(Long reimbursementId) {
////		return reimbursementRepo.findById(reimbursementId).orElseThrow(()-> new EntityNotFoundException("ReimBursememt Request Not Found"));
////		
////	}
////	
////	public Reimbursement updateReimbursementById(Long reimbursementId,Reimbursement updatedreImbursement) {
////		Reimbursement existingReimbursement=getReimbursementById(reimbursementId);
////		existingReimbursement.setDescription(updatedreImbursement.getDescription());
////		existingReimbursement.setApprovedAmount(updatedreImbursement.getApprovedAmount());
////		existingReimbursement.setStatus(updatedreImbursement.getStatus());
////		
////		if(updatedreImbursement.getStatus()==ReimbursementStatus.APPROVED) {
////			if(updatedreImbursement.getApprovedAmount().compareTo(updatedreImbursement.getRequestedAmount())>0) {
////				throw new IllegalArgumentException("Approved amount cannot be exceed requested amount");
////			}
////			existingReimbursement.setApprovedAt(LocalDateTime.now());
////		}
////		return reimbursementRepo.save(existingReimbursement);
////	}
////		
////	
////	public void delete(Long reimbursementId) {
////		if(!reimbursementRepo.existsById(reimbursementId)) {
////			throw new EntityNotFoundException("Reimbursement Record Not Found");
////		}
////		reimbursementRepo.deleteById(reimbursementId);
////	}
////	
////	
////}
