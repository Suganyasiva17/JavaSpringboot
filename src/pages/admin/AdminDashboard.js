import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDashboard } from "../../redux/actions/dashboardActions";
import Layout from "../../components/Layout";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { summary, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

//   useEffect(() => {
//   dispatch(fetchAdminDashboard());
//   console.log("Dashboard API Fired");
// }, [dispatch]);
  if (loading) return <h2>Loading Dashboard...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <Layout>
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

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

      {/* Category Summary */}
      <h2 style={{ marginTop: "40px" }}>Category-wise Requested Amount</h2>

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
            Object.entries(summary.categorySummary).map(([category, amount]) => (
              <tr key={category}>
                <td>{category}</td>
                <td>₹ {amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};


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

export default AdminDashboard;