import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EmployeeDashboard() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/dashboard/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="page">
      <h1>My Dashboard</h1>

      <div className="cards">
        <div className="card"><h3>Total Requested</h3><p>₹{data.totalRequested}</p></div>
        <div className="card"><h3>Total Approved</h3><p>₹{data.totalApproved}</p></div>
        <div className="card"><h3>Total Pending</h3><p>₹{data.totalPending}</p></div>
      </div>

      <h2>Category Summary</h2>

      <table>
        <thead><tr><th>Category</th><th>Amount</th></tr></thead>
        <tbody>
          {Object.entries(data.categorySummary).map(([k, v]) => (
            <tr key={k}><td>{k}</td><td>₹{v}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}