// import React from "react";

// const CommonTable = ({ columns, data, actions }) => {
//   return (
//     <table style={tableStyle}>
//       <thead>
//         <tr>
//           {columns.map((col) => (
//             <th key={col}>{col}</th>
//           ))}
//           {actions && <th>Actions</th>}
//         </tr>
//       </thead>

//       <tbody>
//         {data.map((row) => (
//           <tr key={row.id}>
//             {columns.map((col) => (
//               <td key={col}>{row[col]}</td>
//             ))}

//             {actions && (
//               <td>
//                 {actions.map((action, index) => (
//                   <button
//                     key={index}
//                     style={action.style}
//                     onClick={() => action.onClick(row)}
//                   >
//                     {action.label}
//                   </button>
//                 ))}
//               </td>
//             )}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "20px",
//   border: "1px solid #ccc",
// };

// export default CommonTable;

import React from "react";

const CommonTable = ({ columns, data, actions }) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col}>{row[col]}</td>
            ))}

            {actions && (
              <td>
                {actions.map((action, index) =>
                  action.hide && action.hide(row) ? null : (
                    <button
                      key={index}
                      style={{
                        ...action.style,
                        marginRight: 6,
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => action.onClick(row)}
                    >
                      {action.label}
                    </button>
                  )
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  border: "1px solid #ccc",
};

export default CommonTable;