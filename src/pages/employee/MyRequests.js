import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import CommonTable from "../../components/CommonTable";
import CommonForm from "../../components/CommonForm";

import API from "../../utils/api";
import { fetchAllReimbursements } from "../../redux/actions/reimbursementActions";
import { fetchCategories } from "../../redux/actions/categoryActions";

const MyRequests = ({ params }) => {
  const employeeId = params.id;

  const dispatch = useDispatch();
  const { reimbursements } = useSelector((state) => state.reimbursement);
  const { categories } = useSelector((state) => state.category);

  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    categoryId: "",
    description: "",
    requestedAmount: "",
  });

  useEffect(() => {
    dispatch(fetchAllReimbursements());
    dispatch(fetchCategories());
  }, [dispatch]);

  const myRequests = reimbursements.filter(
    (r) => r.employee?.id === Number(employeeId)
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setShowForm(true);
    setEditMode(false);
    setSelectedId(null);
    setFormData({
      categoryId: "",
      description: "",
      requestedAmount: "",
    });
  };

  const handleEdit = (row) => {
    if (row.status !== "PENDING") {
      alert("Only pending requests can be edited!");
      return;
    }

    setShowForm(true);
    setEditMode(true);
    setSelectedId(row.id);

    setFormData({
      categoryId: row.category?.id,
      description: row.description,
      requestedAmount: row.requestedAmount,
    });
  };

  const handleDelete = async (row) => {
    if (row.status !== "PENDING") {
      alert("Only pending requests can be cancelled!");
      return;
    }

    if (window.confirm("Cancel this request?")) {
      await API.delete(`/reimbursement/${row.id}`); // FIXED: removed trailing slash
      dispatch(fetchAllReimbursements());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      await API.put(`/reimbursement/${selectedId}`, {
        category: { id: formData.categoryId },
        description: formData.description,
        requestedAmount: Number(formData.requestedAmount),
        status: "PENDING",
        approvedAmount: 0,
      });
    } else {
      await API.post(
        `/reimbursement/${employeeId}/${formData.categoryId}`, // FIXED
        {
          description: formData.description,
          requestedAmount: Number(formData.requestedAmount),
        }
      );
    }

    dispatch(fetchAllReimbursements());
    setShowForm(false);
    setEditMode(false);
  };

  return (
    <Layout>
      <h1>My Requests</h1>

      <button
        style={addBtn}
        onClick={handleAdd}
      >
        + Add New Request
      </button>

      <CommonTable
        columns={[
          "id",
          "categoryName",
          "description",
          "requestedAmount",
          "approvedAmount",
          "status",
        ]}
        data={myRequests.map((r) => ({
          ...r,
          categoryName: r.category?.categoryName,
        }))}
        actions={[
          {
            label: "Edit",
            style: { backgroundColor: "blue", color: "white", marginRight: 8 },
            onClick: handleEdit,
            hide: (row) => row.status !== "PENDING",
          },
          {
            label: "Cancel",
            style: { backgroundColor: "red", color: "white" },
            onClick: handleDelete,
            hide: (row) => row.status !== "PENDING",
          },
        ]}
      />

      {showForm && (
        <CommonForm
          title={editMode ? "Edit Request" : "Create New Request"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          fields={[
            {
              type: "select",
              name: "categoryId",
              value: formData.categoryId,
              onChange: handleChange,
              options: categories.map((c) => ({
                value: c.id,
                label: c.categoryName,
              })),
              label: "Category",
              required: true,
            },
            {
              type: "text",
              name: "description",
              label: "Description",
              value: formData.description,
              onChange: handleChange,
              required: true,
            },
            {
              type: "number",
              name: "requestedAmount",
              label: "Requested Amount",
              value: formData.requestedAmount,
              onChange: handleChange,
              required: true,
            },
          ]}
        />
      )}
    </Layout>
  );
};

const addBtn = {
  padding: "10px 15px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "15px",
};

export default MyRequests;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../../components/Layout";
// import CommonTable from "../../components/CommonTable";
// import CommonForm from "../../components/CommonForm";

// import API from "../../utils/api";
// import { fetchAllReimbursements } from "../../redux/actions/reimbursementActions";
// import { fetchCategories } from "../../redux/actions/categoryActions";

// const MyRequests = ({ params }) => {
//   const employeeId = params.id; // from URL

//   const dispatch = useDispatch();
//   const { reimbursements } = useSelector((state) => state.reimbursement);
//   const { categories } = useSelector((state) => state.category);

//   const [showForm, setShowForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);

//   const [formData, setFormData] = useState({
//     categoryId: "",
//     description: "",
//     requestedAmount: "",
//   });

//   // Load reimbursements & categories on mount
//   useEffect(() => {
//     dispatch(fetchAllReimbursements());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // Filter reimbursements for this employee
//   const myRequests = reimbursements.filter(
//     (r) => r.employee?.id === Number(employeeId)
//   );

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add new request
//   const handleAdd = () => {
//     setShowForm(true);
//     setEditMode(false);
//     setSelectedId(null);
//     setFormData({
//       categoryId: "",
//       description: "",
//       requestedAmount: "",
//     });
//   };

//   // Edit request (only if status == PENDING)
//   const handleEdit = (row) => {
//     if (row.status !== "PENDING") {
//       alert("Only pending requests can be edited!");
//       return;
//     }

//     setShowForm(true);
//     setEditMode(true);
//     setSelectedId(row.id);

//     setFormData({
//       categoryId: row.category?.id,
//       description: row.description,
//       requestedAmount: row.requestedAmount,
//     });
//   };

//   // Cancel (delete) request
//   const handleDelete = async (row) => {
//     if (row.status !== "PENDING") {
//       alert("Only pending requests can be cancelled!");
//       return;
//     }

//     if (window.confirm("Cancel this request?")) {
//       await API.delete(`/reimbursement/${row.id}`);
//       dispatch(fetchAllReimbursements());
//     }
//   };

//   // Submit form (add or update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editMode) {
//       await API.put(`/reimbursement/${selectedId}`, {
//         category: { id: formData.categoryId },
//         description: formData.description,
//         requestedAmount: Number(formData.requestedAmount),
//         status: "PENDING",
//         approvedAmount: 0,
//       });
//     } else {
//       await API.post(
//         `/reimbursement/${employeeId}/${formData.categoryId}`,
//         {
//           description: formData.description,
//           requestedAmount: Number(formData.requestedAmount),
//         }
//       );
//     }

//     dispatch(fetchAllReimbursements());
//     setShowForm(false);
//     setEditMode(false);
//   };

//   return (
//     <Layout>
//       <h1>My Requests</h1>

//       <button
//         style={addBtn}
//         onClick={handleAdd}
//       >
//         + Add New Request
//       </button>

//       <CommonTable
//         columns={[
//           "id",
//           "categoryName",
//           "description",
//           "requestedAmount",
//           "approvedAmount",
//           "status",
//         ]}
//         data={myRequests.map((r) => ({
//           ...r,
//           categoryName: r.category?.categoryName,
//         }))}
//         actions={[
//           {
//             label: "Edit",
//             style: { backgroundColor: "blue", color: "white", marginRight: 8 },
//             onClick: handleEdit,
//           },
//           {
//             label: "Cancel",
//             style: { backgroundColor: "red", color: "white" },
//             onClick: handleDelete,
//           },
//         ]}
//       />

//       {showForm && (
//         <CommonForm
//           title={editMode ? "Edit Request" : "Create New Request"}
//           onSubmit={handleSubmit}
//           onCancel={() => setShowForm(false)}
//           fields={[
//             {
//               type: "select",
//               name: "categoryId",
//               value: formData.categoryId,
//               onChange: handleChange,
//               options: categories.map((c) => ({ value: c.id, label: c.categoryName })),
//               label: "Category",
//               required: true,
//             },
//             {
//               type: "text",
//               name: "description",
//               label: "Description",
//               value: formData.description,
//               onChange: handleChange,
//               required: true,
//             },
//             {
//               type: "number",
//               name: "requestedAmount",
//               label: "Requested Amount",
//               value: formData.requestedAmount,
//               onChange: handleChange,
//               required: true,
//             },
//           ]}
//         />
//       )}
//     </Layout>
//   );
// };

// // Button Style
// const addBtn = {
//   padding: "10px 15px",
//   backgroundColor: "green",
//   color: "white",
//   border: "none",
//   borderRadius: "6px",
//   cursor: "pointer",
//   marginBottom: "15px",
// };

// export default MyRequests;