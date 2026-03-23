package com.erms.service;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.erms.entity.*;
import com.erms.repository.ReimbursementRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.math.BigDecimal;
import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class DashboardServiceTest {

    @Mock
    private ReimbursementRepo repo;

    @InjectMocks
    private DashboardService dashboard;

    private Category cat;
    private Reimbursement r1, r2;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        cat = new Category(1L, "Travel", "Travel Expenses");

        r1 = new Reimbursement();
        r1.setRequestedAmount(BigDecimal.valueOf(1000));
        r1.setApprovedAmount(BigDecimal.valueOf(500));
        r1.setCategory(cat);
        r1.setStatus(ReimbursementStatus.APPROVED);

        r2 = new Reimbursement();
        r2.setRequestedAmount(BigDecimal.valueOf(2000));
        r2.setApprovedAmount(BigDecimal.ZERO);
        r2.setCategory(cat);
        r2.setStatus(ReimbursementStatus.PENDING);
    }

    @Test
    void testAdminSummary() {
        when(repo.findAll()).thenReturn(List.of(r1, r2));

        Map<String, Object> summary = dashboard.getAdminSummary();

        assertEquals(BigDecimal.valueOf(3000), summary.get("totalRequested"));
        assertEquals(BigDecimal.valueOf(500), summary.get("totalApproved"));
        assertEquals(BigDecimal.valueOf(2500), summary.get("totalPending"));
    }

    @Test
    void testEmployeeSummary() {
        when(repo.findByEmployeeId(1L)).thenReturn(List.of(r1, r2));

        Map<String, Object> summary = dashboard.getEmployeeSummary(1L);

        assertEquals(BigDecimal.valueOf(3000), summary.get("totalRequested"));
    }
}