import React from "react";

export default function CrudTable({ columns, data, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.accessor}>{col.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(col => (
              <td key={col.accessor}>
                {col.accessor.split(".").reduce((acc, key) => acc?.[key], row)}
              </td>
            ))}

            <td>
              <button onClick={() => onEdit(row)}>Edit</button>
              <button
                onClick={() => onDelete(row.id)}
                style={{ marginLeft: "8px", color: "red" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}





// // import React from "react";

// // export default function CrudTable({ columns, data, onEdit, onDelete }) {
// //   return (
// //     <table border="1" cellPadding="10">
// //       <thead>
// //         <tr>
// //           {columns.map((col) => (
// //             <th key={col.accessor}>{col.label}</th>
// //           ))}
// //           <th>Actions</th>
// //         </tr>
// //       </thead>

// //       <tbody>
// //         {data.map((row) => (
// //           <tr key={row.id}>
// //             {columns.map((col) => (
// //               <td key={col.accessor}>{row[col.accessor]}</td>
// //             ))}

// //             <td>
// //               <button onClick={() => onEdit(row)}>Edit</button>
// //               <button
// //                 onClick={() => onDelete(row.id)}
// //                 style={{ marginLeft: "8px", color: "red" }}
// //               >
// //                 Delete
// //               </button>
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // }

// import React from "react";

// const getValue = (obj, path) =>
//   path.split(".").reduce((acc, key) => acc?.[key], obj);

// export default function CrudTable({ columns, data, onEdit, onDelete }) {
//   return (
//     <table border="1" cellPadding="10">
//       <thead>
//         <tr>
//           {columns.map((col) => (
//             <th key={col.accessor}>{col.label}</th>
//           ))}
//           <th>Actions</th>
//         </tr>
//       </thead>

//       <tbody>
//         {data.map((row) => (
//           <tr key={row.id}>
//             {columns.map((col) => (
//               <td key={col.accessor}>{getValue(row, col.accessor)}</td>
//             ))}

//             <td>
//               <button onClick={() => onEdit(row)}>Edit</button>
//               <button
//                 onClick={() => onDelete(row.id)}
//                 style={{ marginLeft: "8px", color: "red" }}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }