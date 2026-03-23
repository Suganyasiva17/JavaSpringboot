import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/actions/categoryActions";
import API from "../../utils/api";
import CommonTable from "../../components/CommonTable";
import CommonForm from "../../components/CommonForm";
import Layout from "../../components/Layout";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (row) => {
    setShowForm(true);
    setEditId(row.id);
    setFormData({
      categoryName: row.categoryName,
      categoryDescription: row.categoryDescription,
    });
  };

  const handleDelete = async (row) => {
    if (window.confirm("Delete this category?")) {
      await API.delete(`/categories/${row.id}`);
      dispatch(fetchCategories());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/categories/${editId}`, formData);
    } else {
      await API.post("/categories", formData);
    }

    dispatch(fetchCategories());
    setShowForm(false);
    setEditId(null);
    setFormData({ categoryName: "", categoryDescription: "" });
  };

  return (
    <Layout>
      <h1>Category Management</h1>

      <button
        style={{ padding: 10, backgroundColor: "green", color: "white", border: "none" }}
        onClick={() => setShowForm(true)}
      >
        + Add Category
      </button>

      <CommonTable
        columns={["id", "categoryName", "categoryDescription"]}
        data={categories}
        actions={[
          { label: "Edit", style: { backgroundColor: "blue", color: "white", marginRight: 8 }, onClick: handleEdit },
          { label: "Delete", style: { backgroundColor: "red", color: "white" }, onClick: handleDelete },
        ]}
      />

      {showForm && (
        <CommonForm
          title={editId ? "Edit Category" : "Add Category"}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          fields={[
            {
              type: "text",
              name: "categoryName",
              label: "Category Name",
              value: formData.categoryName,
              onChange: handleChange,
              required: true,
            },
            {
              type: "textarea",
              name: "categoryDescription",
              label: "Description",
              value: formData.categoryDescription,
              onChange: handleChange,
            },
          ]}
        />
      )}
    </Layout>
  );
};

export default CategoryManagement;