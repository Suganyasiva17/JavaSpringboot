package com.erms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erms.entity.Reimbursement;
import com.erms.entity.ReimbursementStatus;

@Repository
public interface ReimbursementRepo extends JpaRepository<Reimbursement, Long> {

    
    List<Reimbursement> findByEmployeeId(Long employeeId);

    List<Reimbursement> findByStatus(ReimbursementStatus status);

    
    List<Reimbursement> findByEmployeeIdAndStatus(Long employeeId, ReimbursementStatus status);
}





////package com.erms.repository;
////
////import java.math.BigDecimal;
////import java.util.List;
////
////import org.springframework.data.jpa.repository.JpaRepository;
////import org.springframework.data.jpa.repository.Query;
////import org.springframework.stereotype.Repository;
////
////import com.erms.entity.Reimbursement;
////import com.erms.entity.ReimbursementStatus;
////
////@Repository
////public interface ReimbursementRepo extends JpaRepository<Reimbursement, Long> {
////
////    // GLOBAL TOTALS
////    BigDecimal sumRequestedAmount();
////    BigDecimal sumApprovedAmountByStatus(ReimbursementStatus status);
////
////    // EMPLOYEE TOTALS
////    BigDecimal sumRequestedAmountByEmployee_Id(Long employeeId);
////    BigDecimal sumApprovedAmountByEmployee_IdAndStatus(Long employeeId, ReimbursementStatus status);
////
////    // CATEGORY SUMMARIES
////    @Query("SELECT r.category.categoryName, COALESCE(SUM(r.requestedAmount), 0) " +
////           "FROM Reimbursement r GROUP BY r.category.categoryName")
////    List<Object[]> getCategoryTotals();
////
////    @Query("SELECT r.category.categoryName, COALESCE(SUM(r.requestedAmount), 0) " +
////           "FROM Reimbursement r WHERE r.employee.id = :employeeId " +
////           "GROUP BY r.category.categoryName")
////    List<Object[]> getEmployeeCategoryTotals(Long employeeId);
////}
//
//
//
//
//package com.erms.repository;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//import com.erms.entity.Reimbursement;
//
//@Repository
//public interface ReimbursementRepo extends JpaRepository<Reimbursement, Long>{
//
//	
//	@Query("SELECT COALESCE(SUM(r.requestedAmount), 0)FROM Reimbursement r WHERE r.employee.id = :employeeId")
//	BigDecimal getEmployeeTotalRequested(Long employeeId);
//
//	@Query("SELECT COALESCE(SUM(r.approvedAmount), 0) FROM Reimbursement r WHERE r.employee.id = :employeeId AND r.status = 'APPROVED'")
//	BigDecimal getEmployeeTotalApproved(Long employeeId);
//
//	@Query("SELECT r.category.categoryName, COALESCE(SUM(r.requestedAmount), 0)FROM Reimbursement r WHERE r.employee.id = :employeeId GROUP BY r.category.categoryName")
//	List<Object[]> getEmployeeCategoryTotals(Long employeeId);
//	 
//	    @Query("SELECT COALESCE(SUM(r.requestedAmount), 0) FROM Reimbursement r")
//	    BigDecimal getTotalRequestedAmount();
//
//	    
//	    @Query("SELECT COALESCE(SUM(r.approvedAmount), 0) FROM Reimbursement r WHERE r.status = 'APPROVED'")
//	    BigDecimal getTotalApprovedAmount();
//
//	    
//	    @Query("SELECT r.category.categoryName, COALESCE(SUM(r.requestedAmount), 0) " +
//	           "FROM Reimbursement r GROUP BY r.category.categoryName")
//	    List<Object[]> getCategoryTotals();
//
//}
