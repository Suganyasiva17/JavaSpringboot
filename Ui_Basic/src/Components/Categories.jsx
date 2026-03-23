import { useEffect, useState } from "react";
import axios from "axios";
import CrudForm from "./CRUD/CrudForm";
import CrudTable from "./CRUD/CrudTable";

export default function Categories() {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: ""
  });

  const [editId, setEditId] = useState(null);

  // Load All Categories
  const loadData = () => {
    axios.get("http://localhost:8081/categories")
      .then(res => setData(res.data))
      .catch(err => console.error("Error loading categories", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Columns for generic table
  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Category Name", accessor: "categoryName" },
    { label: "Description", accessor: "categoryDescription" }
  ];

  // Fields for generic form
  const fields = [
    { name: "categoryName", placeholder: "Category Name", required: true },
    { name: "categoryDescription", placeholder: "Category Description" }
  ];

  // Create or Update Category
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editId) {
      axios.post("http://localhost:8081/categories", formData)
        .then(() => {
          alert("Category Created!");
          setFormData({});
          loadData();
        });
    } else {
      axios.put(`http://localhost:8081/categories/${editId}`, formData)
        .then(() => {
          alert("Category Updated!");
          setEditId(null);
          setFormData({});
          loadData();
        });
    }
  };

  // Start Editing
  const handleEdit = (cat) => {
    setEditId(cat.id);
    setFormData({
      categoryName: cat.categoryName,
      categoryDescription: cat.categoryDescription
    });
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      axios.delete(`http://localhost:8081/categories/${id}`)
        .then(() => loadData());
    }
  };

  return (
    <div className="page">
      <h1>Categories</h1>

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

// export default function Categories() {
//   const [categories, setCategories] = useState([]);

//   const [form, setForm] = useState({
//     categoryName: "",
//     categoryDescription: ""
//   });

//   const [editId, setEditId] = useState(null);

//   // Load all categories
//   const loadCategories = () => {
//     axios.get("http://localhost:8081/categories")
//       .then(res => setCategories(res.data))
//       .catch(err => console.error("Error loading categories:", err));
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   // Handle Form Change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // CREATE Category
//   const handleCreate = (e) => {
//     e.preventDefault();

//     axios.post("http://localhost:8081/categories", form)
//       .then(() => {
//         alert("Category Created!");
//         setForm({ categoryName: "", categoryDescription: "" });
//         loadCategories();
//       })
//       .catch(err => alert("Error creating category"));
//   };

//   // Start Editing
//   const startEdit = (cat) => {
//     setEditId(cat.id);
//     setForm({
//       categoryName: cat.categoryName,
//       categoryDescription: cat.categoryDescription
//     });
//   };

//   // UPDATE category
//   const handleUpdate = (e) => {
//     e.preventDefault();

//     axios.put(`http://localhost:8081/categories/${editId}`, form)
//       .then(() => {
//         alert("Category Updated!");
//         setEditId(null);
//         setForm({ categoryName: "", categoryDescription: "" });
//         loadCategories();
//       })
//       .catch(() => alert("Update failed"));
//   };

//   // DELETE category
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure to delete this category?")) {
//       axios.delete(`http://localhost:8081/categories/${id}`)
//         .then(() => {
//           alert("Category Deleted!");
//           loadCategories();
//         });
//     }
//   };

//   return (
//     <div className="page">
//       <h1>Categories</h1>

//       {/* ===== CATEGORY FORM ===== */}
//       <form onSubmit={editId ? handleUpdate : handleCreate} style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           name="categoryName"
//           placeholder="Category Name"
//           value={form.categoryName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="categoryDescription"
//           placeholder="Category Description"
//           value={form.categoryDescription}
//           onChange={handleChange}
//         />

//         <button type="submit">
//           {editId ? "Update Category" : "Add Category"}
//         </button>

//         {editId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditId(null);
//               setForm({ categoryName: "", categoryDescription: "" });
//             }}
//             style={{ marginLeft: "10px" }}
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* ===== TABLE ===== */}
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Category Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {categories.map(cat => (
//             <tr key={cat.id}>
//               <td>{cat.id}</td>
//               <td>{cat.categoryName}</td>
//               <td>{cat.categoryDescription}</td>

//               <td>
//                 <button onClick={() => startEdit(cat)}>Edit</button>

//                 <button
//                   onClick={() => handleDelete(cat.id)}
//                   style={{ color: "red", marginLeft: "8px" }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>
//   );
// }