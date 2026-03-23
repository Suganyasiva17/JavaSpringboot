import React from "react";
import { Link } from "react-router-dom";

const EmployeeNavbar = ({ employeeId }) => {
  return (
    <div style={navStyle}>
      <h2 style={{ color: "white", marginRight: "20px" }}>ERMS (Employee)</h2>

      <Link style={linkStyle} to={`/employee/dashboard/${employeeId}`}>Dashboard</Link>
      <Link style={linkStyle} to={`/employee/profile/${employeeId}`}>My Profile</Link>
      <Link style={linkStyle} to={`/employee/my-requests/${employeeId}`}>My Requests</Link>

      <button style={logoutBtn}>Logout</button>
    </div>
  );
};

const navStyle = {
  backgroundColor: "#444",
  padding: "15px",
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};

const logoutBtn = {
  marginLeft: "auto",
  backgroundColor: "red",
  padding: "8px 15px",
  border: "none",
  borderRadius: "5px",
  color: "white",
  cursor: "pointer",
};

export default EmployeeNavbar;