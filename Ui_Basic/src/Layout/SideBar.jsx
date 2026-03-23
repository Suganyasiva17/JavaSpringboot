import { Link } from "react-router-dom";
import "./SideBar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">ERMS</h2>

      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/reimbursements">Reimbursements</Link></li>
      </ul>
    </div>
  );
}