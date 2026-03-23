import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyProfile from "./Components/MyProfile";

import AdminDashboard from "./Components/dashboard/AdminDashboard";
import EmployeeDashboard from "./Components/dashboard/EmployeeDashboard";

import NavBar from "./Layout/NavBar";
import Employees from "./Components/Employees";
import Categories from "./Components/Categories";
import Reimbursements from "./Components/Reimbursement";

export default function App() {
  return (
    <BrowserRouter>
     
    <NavBar/>
      <Routes>
        
<Route path="/" element={<Navigate to="/admin/dashboard" />} />

    <Route path="/admin/dashboard" element={<AdminDashboard />} />

    <Route path="/employee/dashboard/:id" element={<EmployeeDashboard />} />

    <Route path="/employees" element={<Employees />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/reimbursements" element={<Reimbursements />} />

   
    <Route path="/myprofile/:id" element={<MyProfile />} />
  </Routes>
</BrowserRouter>

  );
}

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./Layout/SideBar";
// import "./Layout/SideBar";
// import Dashboard from "./Components/Dashboard";
// import Employees from "./Components/Employees";
// import Categories from "./Components/Categories";
// import Reimbursements from "./Components/Reimbursement";
// import "./index.css";

// function App() {
//   return (
//     <BrowserRouter>
//       <Sidebar />
//       <Routes>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/employees" element={<Employees />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/reimbursements" element={<Reimbursements />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;