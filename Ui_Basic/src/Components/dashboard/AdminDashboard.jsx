import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8081/dashboard")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>

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

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminDashboard() {
//   const [summary, setSummary] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:8081/dashboard")
//       .then(res => setSummary(res.data))
//       .catch(err => console.error("Error loading admin dashboard:", err));
//   }, []);

//   if (!summary) return <h2>Loading...</h2>;

//   return (
//     <div className="page">
//       <h1>Admin Dashboard</h1>

//       <div className="cards">
//         <div className="card">
//           <h3>Total Requested</h3>
//           <p>₹{summary.totalRequested}</p>
//         </div>

//         <div className="card">
//           <h3>Total Approved</h3>
//           <p>₹{summary.totalApproved}</p>
//         </div>

//         <div className="card">
//           <h3>Total Pending</h3>
//           <p>₹{summary.totalPending}</p>
//         </div>
//       </div>

//       <h2>Category Summary</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Category</th><th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(summary.categorySummary).map(([cat, amt]) => (
//             <tr key={cat}>
//               <td>{cat}</td>
//               <td>₹{amt}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }