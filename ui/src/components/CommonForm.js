import React from "react";

const CommonForm = ({ title, fields, onSubmit, onCancel }) => {
  return (
    <div style={formContainer}>
      <h2>{title}</h2>

      <form onSubmit={onSubmit} style={formStyle}>
        {fields.map((field, index) => (
          <div key={index}>
            {/* TEXTAREA */}
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.label}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                style={inputStyle}
              />

            // SELECT (supports both ["A","B"] AND [{value,label}])
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                style={inputStyle}
              >
                {field.options.map((opt, i) =>
                  typeof opt === "object" ? (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ) : (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>

            // INPUT TYPES (text, number, email, password)
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                style={inputStyle}
              />
            )}
          </div>
        ))}

        <button type="submit" style={saveBtn}>
          Save
        </button>

        <button
          type="button"
          style={cancelBtn}
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

// Styles
const formContainer = {
  marginTop: "30px",
  padding: "20px",
  border: "1px solid gray",
  borderRadius: "10px",
  width: "400px",
  backgroundColor: "#f9f9f9",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const saveBtn = {
  padding: "10px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

const cancelBtn = {
  padding: "10px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "5px",
};

export default CommonForm;