// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import API from "../../utils/api";
// import Layout from "../../components/Layout";
// import CommonTable from "../../components/CommonTable";
// import CommonForm from "../../components/CommonForm";
// import { fetchAllReimbursements } from "../../redux/actions/reimbursementActions";

// const ReimbursementManagement = () => {
//   const dispatch = useDispatch();
//   const { reimbursements } = useSelector((state) => state.reimbursement);

//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [formData, setFormData] = useState({
//     description: "",
//     requestedAmount: "",
//     approvedAmount: "",
//     status: "",
//   });

//   // Load all reimbursements
//   useEffect(() => {
//     dispatch(fetchAllReimbursements());
//   }, [dispatch]);

//   // Handle form field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Edit reimbursement
//   const handleEdit = (row) => {
//     setShowForm(true);
//     setEditId(row.id);

//     setFormData({
//       description: row.description,
//       requestedAmount: row.requestedAmount,
//       approvedAmount: row.approvedAmount,
//       status: row.status,
//     });
//   };

//   // Approve reimbursement
//   const handleApprove = async (row) => {
//     const approvedAmount = window.prompt(
//       "Enter approved amount:",
//       row.requestedAmount
//     );

//     if (!approvedAmount) return;

//     await API.put(`/reimbursement/${row.id}`, {
//       ...row,
//       status: "APPROVED",
//       approvedAmount: approvedAmount,
//     });

//     dispatch(fetchAllReimbursements());
//   };

//   // Reject reimbursement
//   const handleReject = async (row) => {
//     if (!window.confirm("Reject this request?")) return;

//     await API.put(`/reimbursement/${row.id}`, {
//       ...row,
//       status: "REJECTED",
//       approvedAmount: 0,
//     });

//     dispatch(fetchAllReimbursements());
//   };

//   // Save edited reimbursement
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await API.put(`/reimbursement/${editId}`, {
//       ...formData,
//       requestedAmount: Number(formData.requestedAmount),
//       approvedAmount: Number(formData.approvedAmount),
//     });

//     dispatch(fetchAllReimbursements());
//     setShowForm(false);
//     setEditId(null);
//   };

//   return (
//     <Layout>
//       <h1>Reimbursement Management</h1>

//       {/* TABLE */}
//       <CommonTable
//         columns={[
//           "id",
//           "employeeName",
//           "categoryName",
//           "description",
//           "requestedAmount",
//           "approvedAmount",
//           "status",
//         ]}
//         data={reimbursements.map((r) => ({
//           ...r,
//           employeeName: r.employee?.name,
//           categoryName: r.category?.categoryName,
//         }))}
//         actions={[
//           {
//             label: "Edit",
//             style: { backgroundColor: "blue", color: "white", marginRight: 8 },
//             onClick: handleEdit,
//           },
//           {
//             label: "Approve",
//             style: { backgroundColor: "green", color: "white", marginRight: 8 },
//             onClick: handleApprove,
//           },
//           {
//             label: "Reject",
//             style: { backgroundColor: "red", color: "white" },
//             onClick: handleReject,
//           },
//         ]}
//       />

//       {/* FORM */}
//       {showForm && (
//         <CommonForm
//           title="Edit Reimbursement"
//           onSubmit={handleSubmit}
//           onCancel={() => setShowForm(false)}
//           fields={[
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
//             {
//               type: "number",
//               name: "approvedAmount",
//               label: "Approved Amount",
//               value: formData.approvedAmount,
//               onChange: handleChange,
//             },
//             {
//               type: "select",
//               name: "status",
//               value: formData.status,
//               options: ["PENDING", "APPROVED", "REJECTED"],
//               onChange: handleChange,
//             },
//           ]}
//         />
//       )}
//     </Layout>
//   );
// };

// export default ReimbursementManagement;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../utils/api";
import Layout from "../../components/Layout";
import CommonTable from "../../components/CommonTable";
import CommonForm from "../../components/CommonForm";
import { fetchAllReimbursements } from "../../redux/actions/reimbursementActions";

const ReimbursementManagement = () => {
  const dispatch = useDispatch();
  const { reimbursements } = useSelector((state) => state.reimbursement);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    requestedAmount: "",
    approvedAmount: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchAllReimbursements());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (row) => {
    if (row.status !== "PENDING") {
      alert("Only pending requests can be edited!");
      return;
    }

    setShowForm(true);
    setEditId(row.id);

    setFormData({
      description: row.description,
      requestedAmount: row.requestedAmount,
      approvedAmount: row.approvedAmount,
      status: row.status,
    });
  };

  const handleApprove = async (row) => {
    if (row.status !== "PENDING") return;

    const amount = prompt(
      "Enter approved amount:",
      row.requestedAmount
    );

    if (!amount) return;

    await API.put(`/reimbursement/${row.id}`, {
      ...row,
      status: "APPROVED",
      approvedAmount: Number(amount),
    });

    dispatch(fetchAllReimbursements());
  };

  const handleReject = async (row) => {
    if (row.status !== "PENDING") return;

    if (!window.confirm("Reject this request?")) return;

    await API.put(`/reimbursement/${row.id}`, {
      ...row,
      status: "REJECTED",
      approvedAmount: 0
    });

    dispatch(fetchAllReimbursements());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(`/reimbursement/${editId}`, {
      ...formData,
      requestedAmount: Number(formData.requestedAmount),
      approvedAmount: Number(formData.approvedAmount)
    });

    dispatch(fetchAllReimbursements());
    setShowForm(false);
  };

  return (
    <Layout>
      <h1>Reimbursement Management</h1>

      <CommonTable
        columns={[
          "id",
          "employeeName",
          "categoryName",
          "description",
          "requestedAmount",
          "approvedAmount",
          "status",
        ]}
        data={reimbursements.map((r) => ({
          ...r,
          employeeName: r.employee?.name,
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
            label: "Approve",
            style: { backgroundColor: "green", color: "white", marginRight: 8 },
            onClick: handleApprove,
            hide: (row) => row.status !== "PENDING",
          },
          {
            label: "Reject",
            style: { backgroundColor: "red", color: "white" },
            onClick: handleReject,
            hide: (row) => row.status !== "PENDING",
          },
        ]}
      />

      {showForm && (
        <CommonForm
          title="Edit Reimbursement"
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          fields={[
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
            {
              type: "number",
              name: "approvedAmount",
              label: "Approved Amount",
              value: formData.approvedAmount,
              onChange: handleChange,
            },
            {
              type: "select",
              name: "status",
              value: formData.status,
              options: ["PENDING", "APPROVED", "REJECTED"],
              onChange: handleChange,
            },
          ]}
        />
      )}
    </Layout>
  );
};

export default ReimbursementManagement;