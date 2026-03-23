import { useEffect, useState } from "react";
import axios from "axios";
import CrudForm from "./CRUD/CrudForm";
import CrudTable from "./CRUD/CrudTable";

export default function Employees() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: ""
  });

  const [editId, setEditId] = useState(null);

  const loadData = () => {
    axios.get("http://localhost:8081/employee")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Department", accessor: "department" }
  ];

  
  const fields = [
    { name: "name", placeholder: "Name", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "department", placeholder: "Department" }
  ];

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editId) {
      axios.post("http://localhost:8081/employee", formData)
        .then(() => {
          alert("Employee Created!");
          setFormData({});
          loadData();
        });
    } else {
      axios.put(`http://localhost:8081/employee/${editId}`, formData)
        .then(() => {
          alert("Employee Updated!");
          setEditId(null);
          setFormData({});
          loadData();
        });
    }
  };

 
  const handleEdit = (emp) => {
    setEditId(emp.id);
    setFormData({
      name: emp.name,
      email: emp.email,
      department: emp.department
    });
  };

 
  const handleDelete = (id) => {
    if (window.confirm("Delete this employee?")) {
      axios.delete(`http://localhost:8081/employee/${id}`)
        .then(() => loadData());
    }
  };

  return (
    <div className="page">
      <h1>Employees</h1>

      <CrudForm
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editId={editId}
      />

      <CrudTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Employees() {
//   const [employees, setEmployees] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     department: ""
//   });

//   const [editId, setEditId] = useState(null);

//   // Load employees from backend
//   const loadEmployees = () => {
//     axios.get("http://localhost:8081/employee")
//       .then(res => setEmployees(res.data))
//       .catch(err => console.error("Error loading employees:", err));
//   };

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   // Handle form input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Create new employee
//   const handleCreate = (e) => {
//     e.preventDefault();

//     axios.post("http://localhost:8081/employee", form)
//       .then(() => {
//         alert("Employee Created!");
//         setForm({ name: "", email: "", department: "" });
//         loadEmployees();
//       })
//       .catch(err => alert("Error creating employee"));
//   };

//   // Load data into form for editing
//   const startEdit = (emp) => {
//     setEditId(emp.id);
//     setForm({
//       name: emp.name,
//       email: emp.email,
//       department: emp.department
//     });
//   };

//   // Update employee
//   const handleUpdate = (e) => {
//     e.preventDefault();

//     axios.put(`http://localhost:8081/employee/${editId}`, form)
//       .then(() => {
//         alert("Employee Updated!");
//         setEditId(null);
//         setForm({ name: "", email: "", department: "" });
//         loadEmployees();
//       })
//       .catch(() => alert("Update failed"));
//   };

//   // Delete employee
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure to delete this employee?")) {
//       axios.delete(`http://localhost:8081/employee/${id}`)
//         .then(() => {
//           alert("Employee Deleted!");
//           loadEmployees();
//         });
//     }
//   };

//   return (
//     <div className="page">
//       <h1>Employees</h1>

//       {/* FORM */}
//       <form onSubmit={editId ? handleUpdate : handleCreate} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           value={form.department}
//           onChange={handleChange}
//         />

//         <button type="submit">
//           {editId ? "Update Employee" : "Add Employee"}
//         </button>

//         {editId && (
//           <button type="button" onClick={() => {
//             setEditId(null);
//             setForm({ name: "", email: "", department: "" });
//           }}>
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* table */}
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {employees.map(e => (
//             <tr key={e.id}>
//               <td>{e.id}</td>
//               <td>{e.name}</td>
//               <td>{e.email}</td>
//               <td>{e.department}</td>

//               <td>
//                 <button onClick={() => startEdit(e)}>Edit</button>
//                 <button onClick={() => handleDelete(e.id)} style={{ marginLeft: "8px", color: "red" }}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Employees() {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8081/employee")
//       .then(res => setEmployees(res.data));
//   }, []);

//   return (
//     <div className="page">
//       <h1>Employees</h1>

//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>ID</th><th>Name</th><th>Email</th><th>Department</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map(e => (
//             <tr key={e.id}>
//               <td>{e.id}</td>
//               <td>{e.name}</td>
//               <td>{e.email}</td>
//               <td>{e.department}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

