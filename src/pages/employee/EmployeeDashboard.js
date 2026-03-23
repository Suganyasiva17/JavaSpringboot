import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeDashboard } from "../../redux/actions/dashboardActions";
import Layout from "../../components/Layout";


const EmployeeDashboard = ({ params }) => {
  const employeeId = params.id;
  
  const dispatch = useDispatch();
  const { summary, loading, error } = useSelector(
    (state) => state.dashboard
  );

  // Fetch employee-specific dashboard summary
  useEffect(() => {
    dispatch(fetchEmployeeDashboard(employeeId));
  }, [dispatch, employeeId]);

  if (loading) return <Layout><h2>Loading Dashboard...</h2></Layout>;
  if (error) return <Layout><h2>Error: {error}</h2></Layout>;

  return (
    
    <Layout>
      <h1>Employee Dashboard</h1>

      {/* Summary Cards */}
      {summary && (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={cardStyle}>
            <h3>Total Requested</h3>
            <p>₹ {summary.totalRequested}</p>
          </div>

          <div style={cardStyle}>
            <h3>Total Approved</h3>
            <p>₹ {summary.totalApproved}</p>
          </div>

          <div style={cardStyle}>
            <h3>Total Pending</h3>
            <p>₹ {summary.totalPending}</p>
          </div>
        </div>
      )}

      {/* Category-wise summary */}
      <h2 style={{ marginTop: "40px" }}>Category-wise Expenses</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </thead>

        <tbody>
          {summary &&
            summary.categorySummary &&
            Object.entries(summary.categorySummary).map(
              ([category, amount]) => (
                <tr key={category}>
                  <td>{category}</td>
                  <td>₹ {amount}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </Layout>
  );
};

// Simple inline styling
const cardStyle = {
  border: "1px solid gray",
  padding: "15px",
  width: "200px",
  borderRadius: "8px",
  backgroundColor: "#f3f3f3",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
  border: "1px solid #ccc",
};

export default EmployeeDashboard;