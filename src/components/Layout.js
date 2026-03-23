import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./navbars/AdminNavbar";
import EmployeeNavbar from "./navbars/EmployeeNavbar";


const Layout = ({ children }) => {
  const { role, employeeId } = useSelector((state) => state.auth);
console.log("Role from Redux:", role);

  return (
    <>
      {role === "ADMIN" && <AdminNavbar />}

      {role === "EMPLOYEE" && (
        <EmployeeNavbar employeeId={employeeId} />
      )}

      <div style={contentStyle}>
        {children}
      </div>
    </>
  );
};

const contentStyle = {
  padding: "20px",
};

export default Layout;