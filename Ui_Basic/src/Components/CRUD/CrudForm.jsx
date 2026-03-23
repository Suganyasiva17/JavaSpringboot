import React from "react";

export default function CrudForm({ fields, formData, setFormData, onSubmit, editId }) {

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "20px" }}>

      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type || "text"}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
          style={{ marginRight: "10px" }}
        />
      ))}

      <button type="submit">{ editId ? "Update" : "Create"} </button>

      {editId && (
        <button type="button"  onClick={() => { setFormData({}); }}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}