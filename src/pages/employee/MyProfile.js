import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeById } from "../../redux/actions/employeeActions";
import API from "../../utils/api";
import Layout from "../../components/Layout";
import CommonForm from "../../components/CommonForm";


const MyProfile = ({ params }) => {
  const employeeId = params.id;
  const dispatch = useDispatch();
  const { employee, loading } = useSelector((state) => state.employee);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  // Load employee data
  useEffect(() => {
    dispatch(fetchEmployeeById(employeeId));
  }, [dispatch, employeeId]);

  // Populate form when employee loads
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        department: employee.department || "",
        role: employee.role,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await API.put(`/employee/${employeeId}`, formData);

    setEditMode(false);
    dispatch(fetchEmployeeById(employeeId)); 
  };

  if (loading) {
    return <Layout><h2>Loading Profile...</h2></Layout>;
  }

  return (
    <Layout>
      <h1>My Profile</h1>

      {/* VIEW MODE */}
      {!editMode && employee && (
        <div style={profileBox}>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Role:</strong> {employee.role}</p>

          <button
            style={editBtn}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>
      )}

      
      {editMode && (
        <CommonForm
          title="Edit My Profile"
          onSubmit={handleUpdate}
          onCancel={() => setEditMode(false)}
          fields={[
            {
              type: "text",
              name: "name",
              label: "Name",
              value: formData.name,
              onChange: handleChange,
              required: true,
            },
            {
              type: "email",
              name: "email",
              label: "Email",
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
              options: ["EMPLOYEE"], 
              onChange: handleChange,
            },
          ]}
        />
      )}
    </Layout>
  );
};

const profileBox = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  width: "350px",
  lineHeight: "1.8",
};

const editBtn = {
  padding: "10px 15px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

export default MyProfile;