import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div style={navStyle}>
      <h2 style={{ color: "white", marginRight: "20px" }}>ERMS (Admin)</h2>

      <Link style={linkStyle} to="/admin/dashboard">Dashboard</Link>
      <Link style={linkStyle} to="/admin/employees">Employees</Link>
      <Link style={linkStyle} to="/admin/category">Categories</Link>
      <Link style={linkStyle} to="/admin/reimbursement">Reimbursements</Link>

      <button style={logoutBtn}>Logout</button>
    </div>
  );
};

const navStyle = {
  backgroundColor: "#333",
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

export default AdminNavbar;