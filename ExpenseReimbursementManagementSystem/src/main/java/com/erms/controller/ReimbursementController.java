package com.erms.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.erms.entity.Reimbursement;
import com.erms.service.ReimbursementService;

@RestController
@RequestMapping("/reimbursement")
@CrossOrigin(origins = "*")
public class ReimbursementController {

    private final ReimbursementService reimbursementService;

    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }


    @PostMapping("/{employeeId}/{categoryId}")
    public Reimbursement createReimbursement(@RequestBody Reimbursement reimbursement,
                                             @PathVariable Long employeeId,
                                             @PathVariable Long categoryId) {
        return reimbursementService.createReimbursement(reimbursement, employeeId, categoryId);
    }

    @GetMapping("/{reImbursementid}")
    public Reimbursement getReimbursementById(@PathVariable Long reImbursementid) {
        return reimbursementService.getReimbursementById(reImbursementid);
    }

    @GetMapping
    public List<Reimbursement> getAllReimbursement() {
        return reimbursementService.getAllReimbursement();
    }

    @PutMapping("/{reImbursementid}")
    public Reimbursement updateReimbursement(@PathVariable Long reImbursementid,
                                             @RequestBody Reimbursement reimbursement) {
        return reimbursementService.updateReimbursementById(reImbursementid, reimbursement);
    }

    @DeleteMapping("/{reImbursementid}")
    public String deleteReimbursement(@PathVariable Long reImbursementid) {
        reimbursementService.delete(reImbursementid);
        return "Reimbursement Deleted successfully";
    }


    @GetMapping("/employee/{id}/total-requested")
    public BigDecimal getEmployeeTotalRequested(@PathVariable Long id) {
        return reimbursementService.getEmployeeTotalRequested(id);
    }

    @GetMapping("/employee/{id}/total-approved")
    public BigDecimal getEmployeeTotalApproved(@PathVariable Long id) {
        return reimbursementService.getEmployeeTotalApproved(id);
    }

    @GetMapping("/employee/{id}/category-totals")
    public Map<String, BigDecimal> getEmployeeCategoryTotals(@PathVariable Long id) {
        return reimbursementService.getEmployeeCategoryTotals(id);
    }

    @GetMapping("/total-requested")
    public BigDecimal getTotalRequestedAmount() {
        return reimbursementService.getTotalRequestedAmount();
    }

    @GetMapping("/total-approved")
    public BigDecimal getTotalApprovedAmount() {
        return reimbursementService.getTotalApprovedAmount();
    }

    @GetMapping("/category-totals")
    public Map<String, BigDecimal> getCategoryTotals() {
        return reimbursementService.getCategoryTotals();
    }
}


//package com.erms.controller;
//
//import java.util.List;
//
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.erms.entity.Reimbursement;
//import com.erms.service.ReimbursementService;
//
//@RestController
//@RequestMapping("/reimbursement")
//@CrossOrigin(origins = "*")
//public class ReimbursementController {
//
//	private final ReimbursementService reimbursementService;
//
//	public ReimbursementController(ReimbursementService reimbursementService) {
//		
//		this.reimbursementService = reimbursementService;
//	}
//	
//	@PostMapping("/{employeeId}/{categoryId}")
//	public Reimbursement createReimbursement(@RequestBody Reimbursement reimbursement,@PathVariable Long employeeId,@PathVariable Long categoryId) {
//		return reimbursementService.createReimbursement(reimbursement, employeeId, categoryId);
//	}
//	
//	@GetMapping("/{reImbursementid}")
//	public Reimbursement getReimbursementById(@PathVariable Long reImbursementid) {
//		return reimbursementService.getReimbursementById(reImbursementid);
//	}
//	
//	@GetMapping
//	public List<Reimbursement> getAllReimbursement(){
//		return reimbursementService.getAllReimbursement();
//	}
//	
//	@PutMapping("/{reImbursementid}")
//	public Reimbursement updateReimbursement(@PathVariable Long reImbursementid,@RequestBody Reimbursement reimbursement) {
//		return reimbursementService.updateReimbursementById(reImbursementid, reimbursement);
//	}
//	
//	@DeleteMapping("/{reImbursementid}")
//	public String deleteReimbursement(@PathVariable Long reImbursementid) {
//		reimbursementService.delete(reImbursementid);
//		return "Reimbursement Deleted successfully";
//	}
//	
//	
//}
