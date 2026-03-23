import { useEffect, useState } from "react";
import axios from "axios";
import "./Components.css";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Requested</h3>
          <p>₹{data.totalRequested}</p>
        </div>

        <div className="card">
          <h3>Total Approved</h3>
          <p>₹{data.totalApproved}</p>
        </div>

        <div className="card">
          <h3>Total Pending</h3>
          <p>₹{data.totalPending}</p>
        </div>
      </div>

      <h2>Category Summary</h2>
      <ul>
        {Object.entries(data.categorySummary).map(([k, v]) => (
          <li key={k}>{k}: ₹{v}</li>
        ))}
      </ul>
    </div>
  );
}