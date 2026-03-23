import { useEffect, useState } from "react";
import axios from "axios";
import CrudForm from "./CRUD/CrudForm";
import CrudTable from "./CRUD/CrudTable";
import { useParams } from "react-router-dom";

export default function EmployeeReimbursements() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    requestedAmount: "",
    categoryId: ""
  });
  const [editId, setEditId] = useState(null);

  const loadData = () => {
    axios.get(`http://localhost:8081/reimbursement/employee/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Category", accessor: "category.categoryName" },
    { label: "Description", accessor: "description" },
    { label: "Status", accessor: "status" },
    { label: "Requested", accessor: "requestedAmount" },
    { label: "Approved", accessor: "approvedAmount" }
  ];

  const fields = [
    { name: "description", placeholder: "Description", required: true },
    { name: "requestedAmount", type: "number", placeholder: "Requested Amount", required: true },
    { name: "categoryId", placeholder: "Category ID", required: true }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editId) {
      axios.post(
        `http://localhost:8081/reimbursement/${id}/${formData.categoryId}`,
        formData
      )
      .then(() => {
        alert("Request Submitted!");
        setFormData({});
        loadData();
      });
    } else {
      alert("You cannot edit approved/rejected requests"); // optional: only allow editing pending
    }
  };

  const handleDelete = (rid, status) => {
    if (status !== "PENDING") {
      alert("Cannot delete approved or rejected requests");
      return;
    }
    if (window.confirm("Delete this request?")) {
      axios.delete(`http://localhost:8081/reimbursement/${rid}`)
        .then(() => loadData());
    }
  };

  const handleEdit = (item) => {
    if (item.status !== "PENDING") {
      alert("Cannot edit approved or rejected requests");
      return;
    }
    setEditId(item.id);
    setFormData({
      description: item.description,
      requestedAmount: item.requestedAmount,
      categoryId: item.category.id
    });
  };

  return (
    <div className="page">
      <h1>My Reimbursements</h1>

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
        onDelete={(rid) => handleDelete(rid, data.find(d => d.id === rid)?.status)}
      />
    </div>
  );
}




// import { useEffect, useState } from "react";
// import axios from "axios";
// import CrudTable from "./CRUD/CrudTable";
// import CrudForm from "./CRUD/CrudForm";

// export default function Reimbursements() {
//   const [data, setData] = useState([]);

//   const [formData, setFormData] = useState({
//     description: "",
//     requestedAmount: "",
//     approvedAmount: "0",
//     status: "PENDING",
//     employeeId: "",
//     categoryId: ""
//   });

//   const [editId, setEditId] = useState(null);

//   const loadData = () => {
//     axios.get(`http://localhost:8081/reimbursement/${id}`)
//       .then(res => setData(res.data))
//       .catch((e) => console.error("Error loading reimbursements", e));
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const columns = [
//     { label: "ID", accessor: "id" },
//     { label: "Employee", accessor: "employee.id" },
//     { label: "Category", accessor: "category.id" },
//     { label: "Description", accessor: "description" },
//     { label: "Status", accessor: "status" },
//     { label: "Requested", accessor: "requestedAmount" },
//     { label: "Approved", accessor: "approvedAmount" }
//   ];

//   const fields = [
//     { name: "description", placeholder: "Description", required: true },
//     { name: "requestedAmount", type: "number", placeholder: "Requested Amount", required: true },
//     { name: "approvedAmount", type: "number", placeholder: "Approved Amount" },
   
// {
//     name: "status",
//     type: "select",
//     label: "Status",
//     options: ["PENDING", "APPROVED", "REJECTED"]
//   },

//     { name: "employeeId", placeholder: "Employee ID", required: true },
//     { name: "categoryId", placeholder: "Category ID", required: true }
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!editId) {
//       axios.post(
//         `http://localhost:8081/reimbursement/${formData.employeeId}/${formData.categoryId}`,
//         formData
//       )
//         .then(() => {
//           alert("Reimbursement Created!");
//           setFormData({});
//           loadData();
//         });
//     } else {
//       axios.put(`http://localhost:8081/reimbursement/${editId}`, formData)
//         .then(() => {
//           alert("Updated successfully");
//           setEditId(null);
//           setFormData({});
//           loadData();
//         });
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this reimbursement?")) {
//       axios.delete(`http://localhost:8081/reimbursement/${id}`)
//         .then(() => loadData());
//     }
//   };

//   const handleEdit = (item) => {
//     setEditId(item.id);
//     setFormData({
//       description: item.description,
//       requestedAmount: item.requestedAmount,
//       approvedAmount: item.approvedAmount,
//       status: item.status
//     });
//   };

//   return (
//     <div className="page">
//       <h1>Reimbursements</h1>

//       <CrudForm
//         fields={fields}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={handleSubmit}
//         editId={editId}
//       />

//       <CrudTable
//         columns={columns}
//         data={data}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }