import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your dashboard
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ReimbursementManagement from "./pages/admin/ReimbursementManagement";
import withParams from "./utils/withParams";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyProfile from "./pages/employee/MyProfile";

import MyRequests from "./pages/employee/MyRequests";



const MyRequestsWithParams = withParams(MyRequests);
 const EmployeeDashboardWithParams = withParams(EmployeeDashboard);
  const MyProfileWithParams = withParams(MyProfile);






function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<EmployeeManagement />} />
        <Route path="/admin/category" element={<CategoryManagement />}/>
        <Route path="/admin/reimbursement" element={<ReimbursementManagement />}/>
        
        <Route path="/employee/dashboard/:id" element={<EmployeeDashboardWithParams />} />
        <Route path="/employee/profile/:id" element={<MyProfileWithParams />} />
        <Route path="/employee/my-requests/:id" element={<MyRequestsWithParams />} />


        <Route path="/" element={<h1>Welcome to ERMS</h1>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;