import { Link } from "react-router-dom";
import "./NavBar.css";

export default function TopNav() {
  return (
    <nav className="navbar">
      <div className ="logo">Expense Reimbursement</div>

      <ul className="nav-list">
        <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
        <li><Link  to="/employees">Employees</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/reimbursements">Reimbursements</Link></li>
        <li><Link to="/employee">Myprofile</Link></li>
        <li><Link to="/employee/dashboard">Employee Dashboard</Link></li>
      </ul>
    </nav>
  );
}
