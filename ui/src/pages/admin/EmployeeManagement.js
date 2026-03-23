import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, fetchEmployeeById } from "../../redux/actions/employeeActions";
import API from "../../utils/api";

import Layout from "../../components/Layout";
import CommonTable from "../../components/CommonTable";
import CommonForm from "../../components/CommonForm";

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const { employees, employee } = useSelector((state) => state.employee);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    pwd: "",
    role: "EMPLOYEE",
  });

  // Load employees
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Edit employee
  const handleEdit = async (row) => {
    setShowForm(true);
    setEditMode(true);
    setSelectedId(row.id);

    await dispatch(fetchEmployeeById(row.id));

    setFormData({
      name: employee?.name || "",
      email: employee?.email || "",
      department: employee?.department || "",
      // pwd: "", 
      role: employee?.role || "EMPLOYEE",
    });
  };

  // Delete employee
  const handleDelete = async (row) => {
    if (window.confirm("Delete this employee?")) {
      await API.delete(`/employee/${row.id}`);
      dispatch(fetchEmployees());
    }
  };

  // Submit create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      await API.put(`/employee/${selectedId}`, formData);
    } else {
      await API.post("/employee", formData);
    }

    dispatch(fetchEmployees());

    setShowForm(false);
    setEditMode(false);
    setSelectedId(null);

    // reset form
    setFormData({
      name: "",
      email: "",
      department: "",
      pwd: "",
      role: "EMPLOYEE",
    });
  };

  return (
    <Layout>
      <h1>Employee Management</h1>

      <button
        style={{
          padding: "10px 15px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
        onClick={() => {
          setShowForm(true);
          setEditMode(false);
          setSelectedId(null);
          setFormData({
            name: "",
            email: "",
            department: "",
            pwd: "",
            role: "EMPLOYEE",
          });
        }}
      >
        + Add Employee
      </button>

      {/* Employee Table Using CommonTable */}
      <CommonTable
        columns={["id", "name", "email", "department", "role"]}
        data={employees}
        actions={[
          {
            label: "Edit",
            style: { backgroundColor: "blue", color: "white", marginRight: "8px" },
            onClick: handleEdit,
          },
          {
            label: "Delete",
            style: { backgroundColor: "red", color: "white" },
            onClick: handleDelete,
          },
        ]}
      />

      {/* Common Form for Add/Edit */}
      {showForm && (
        <CommonForm
          title={editMode ? "Edit Employee" : "Add Employee"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          fields={[
            {
              type: "text",
              name: "name",
              label: "Employee Name",
              value: formData.name,
              onChange: handleChange,
              required: true,
            },
            {
              type: "email",
              name: "email",
              label: "Employee Email",
              value: formData.email,
              onChange: handleChange,
              required: true,
            },
            {
              type: "text",
              name: "department",
              label: "Department",
              value: formData.department,
              onChange: handleChange,
            },
            {
              type: "select",
              name: "role",
              value: formData.role,
              onChange: handleChange,
              options: ["EMPLOYEE", "ADMIN"],
            },

            // password only for ADD mode
            !editMode && {
              type: "password",
              name: "pwd",
              label: "Password",
              value: formData.pwd,
              onChange: handleChange,
              required: true,
            },
          ].filter(Boolean)} // removes null entry when editing
        />
      )}
    </Layout>
  );
};

export default EmployeeManagement;