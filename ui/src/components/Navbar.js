import React from "react";

const Navbar = () => {
  return (
    <div style={navStyle}>
      <h2 style={{ color: "white" }}>ERMS System</h2>
    </div>
  );
};

const navStyle = {
  backgroundColor: "#333",
  padding: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default Navbar;