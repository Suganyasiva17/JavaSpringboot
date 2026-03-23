package com.erms.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.erms.entity.Reimbursement;
import com.erms.entity.ReimbursementStatus;
import com.erms.repository.ReimbursementRepo;

@Service
public class DashboardService {

    private final ReimbursementRepo reimbursementRepo;

    public DashboardService(ReimbursementRepo reimbursementRepo) {
        this.reimbursementRepo = reimbursementRepo;
    }

    
    public Map<String, Object> getAdminSummary() {

        List<Reimbursement> all = reimbursementRepo.findAll();

        BigDecimal totalRequested = all.stream()
                .map(Reimbursement::getRequestedAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalApproved = all.stream()
                .filter(r -> r.getStatus() == ReimbursementStatus.APPROVED)
                .map(Reimbursement::getApprovedAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalPending = totalRequested.subtract(totalApproved);

        Map<String, BigDecimal> categorySummary = all.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getCategory().getCategoryName(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Reimbursement::getRequestedAmount,
                                BigDecimal::add
                        )
                ));

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalRequested", totalRequested);
        summary.put("totalApproved", totalApproved);
        summary.put("totalPending", totalPending);
        summary.put("categorySummary", categorySummary);

        return summary;
    }

   
    public Map<String, Object> getEmployeeSummary(Long employeeId) {

        List<Reimbursement> list = reimbursementRepo.findByEmployeeId(employeeId);

        BigDecimal totalRequested = list.stream()
                .map(Reimbursement::getRequestedAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalApproved = list.stream()
                .filter(r -> r.getStatus() == ReimbursementStatus.APPROVED)
                .map(Reimbursement::getApprovedAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalPending = totalRequested.subtract(totalApproved);

        Map<String, BigDecimal> categorySummary = list.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getCategory().getCategoryName(),
                        Collectors.reducing(
                                BigDecimal.ZERO,
                                Reimbursement::getRequestedAmount,
                                BigDecimal::add
                        )
                ));

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalRequested", totalRequested);
        summary.put("totalApproved", totalApproved);
        summary.put("totalPending", totalPending);
        summary.put("categorySummary", categorySummary);

        return summary;
    }
}



//package com.erms.service;
//
//import java.math.BigDecimal;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.stereotype.Service;
//
//
//import com.erms.repository.ReimbursementRepo;
//
//@Service
//public class DashboardService {
//
//    private final ReimbursementRepo reimbursementRepo;
//
//    public DashboardService(ReimbursementRepo reimbursementRepo) {
//        this.reimbursementRepo = reimbursementRepo;
//    }
//
//    // ---------------- GLOBAL DASHBOARD ----------------
//    public Map<String, Object> getAdminSummary() {
//
//        BigDecimal totalRequested = reimbursementRepo.getTotalRequestedAmount();
//        BigDecimal totalApproved = reimbursementRepo.getTotalApprovedAmount();
//        BigDecimal totalPending = totalRequested.subtract(totalApproved);
//
//        Map<String, BigDecimal> categorySummary = new HashMap<>();
//        List<Object[]> rows = reimbursementRepo.getCategoryTotals();
//
//        for (Object[] row : rows) {
//            categorySummary.put((String) row[0], (BigDecimal) row[1]);
//        }
//
//        Map<String, Object> summary = new HashMap<>();
//        summary.put("totalRequested", totalRequested);
//        summary.put("totalApproved", totalApproved);
//        summary.put("totalPending", totalPending);
//        summary.put("categorySummary", categorySummary);
//
//        return summary;
//    }
//
//    // ---------------- EMPLOYEE DASHBOARD ----------------
//    public Map<String, Object> getEmployeeSummary(Long employeeId) {
//
//        BigDecimal totalRequested = reimbursementRepo.getEmployeeTotalRequested(employeeId);
//        BigDecimal totalApproved = reimbursementRepo.getEmployeeTotalApproved(employeeId);
//
//        BigDecimal totalPending = totalRequested.subtract(totalApproved);
//
//        Map<String, BigDecimal> categorySummary = new HashMap<>();
//        List<Object[]> rows = reimbursementRepo.getEmployeeCategoryTotals(employeeId);
//
//        for (Object[] row : rows) {
//            categorySummary.put((String) row[0], (BigDecimal) row[1]);
//        }
//
//        Map<String, Object> summary = new HashMap<>();
//        summary.put("totalRequested", totalRequested);
//        summary.put("totalApproved", totalApproved);
//        summary.put("totalPending", totalPending);
//        summary.put("categorySummary", categorySummary);
//
//        return summary;
//    }
//}
//
//
//
//
//
//
////package com.erms.service;
////
////import java.math.BigDecimal;
////import java.util.HashMap;
////import java.util.List;
////import java.util.Map;
////
////import org.springframework.stereotype.Service;
////
////import com.erms.repository.ReimbursementRepo;
////
////
////@Service
////public class DashboardService {
////	private final ReimbursementRepo reimbursementRepo;
////	
////	
////	
////	public DashboardService(ReimbursementRepo reimbursementRepo) {
////		this.reimbursementRepo = reimbursementRepo;
////	}
////	
////	public Map<String,Object> getDashBoardSummary(){
////		
////		BigDecimal totalRequested=reimbursementRepo.getTotalRequestedAmount();
////		BigDecimal totalApproved=reimbursementRepo.getTotalApprovedAmount();
////		BigDecimal totalPending=totalRequested.subtract(totalApproved);
////		
////		Map<String , Object> categoryTotals=new HashMap<>();
////		List<Object[]> results =reimbursementRepo.getCategoryTotals();
////	
////		for(Object[] row: results) {
////			String category=(String) row[0];
////			BigDecimal amount =(BigDecimal)row[1];
////			categoryTotals.put(category, amount);
////		}
////		
////		Map<String,Object> response=new HashMap<>();
////		response.put("totalRequested", totalRequested);
////		response.put("totalApproved", totalApproved);
////		response.put("totalPending", totalPending);
////		response.put("categorySummary", categoryTotals);
////	
////		return response;
////	
////	}
////
////	public Map<String,Object> getEmployeeDashBoardSummary(Long employeeId) {
////		
////		BigDecimal totalRequested=reimbursementRepo.getEmployeeTotalRequested(employeeId);
////		BigDecimal totalApproved=reimbursementRepo.getEmployeeTotalApproved(employeeId);
////		BigDecimal totalPending=totalRequested.subtract(totalApproved);
////		
////		Map<String , Object> categoryTotals=new HashMap<>();
////		List<Object[]> results =reimbursementRepo.getEmployeeCategoryTotals(employeeId);
////	
////		for(Object[] row: results) {
////			String category=(String) row[0];
////			BigDecimal amount =(BigDecimal)row[1];
////			categoryTotals.put(category, amount);
////		}
////		
////		Map<String,Object> response=new HashMap<>();
////		response.put("totalRequested", totalRequested);
////		response.put("totalApproved", totalApproved);
////		response.put("totalPending", totalPending);
////		response.put("categorySummary", categoryTotals);
////	
////		return response;
////	}
////}
