import { useEffect, useState } from "react";
import axios from "axios";
import CrudForm from "./CRUD/CrudForm";
import CrudTable from "./CRUD/CrudTable";
import { useParams } from "react-router-dom";

export default function MyProfile() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: ""
  });
  const { id } = useParams();

  const [editId, setEditId] = useState(null);

  const loadData = () => {
    axios.get(`http://localhost:8081/employee/${id}`)
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