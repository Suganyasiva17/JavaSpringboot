package com.erms.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.erms.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashBoardController {

    private final DashboardService dashboardService;

    public DashBoardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public Map<String, Object> getAdminSummary() {
        return dashboardService.getAdminSummary();
    }

    
    @GetMapping("/{employeeId}")
    public Map<String, Object> getEmployeeSummary(@PathVariable Long employeeId) {
        return dashboardService.getEmployeeSummary(employeeId);
    }
}


