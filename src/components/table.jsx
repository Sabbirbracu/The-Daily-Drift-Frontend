// import { FaToggleOff, FaToggleOn } from "react-icons/fa";

// const Table = ({ columns, data, toggleFields = [], onToggle }) => {
//   return (
//     <div className="max-h-screen overflow-x-auto shadow rounded-lg">
//       <table className="min-w-full table-auto divide-y divide-gray-200 bg-white">
//         <thead className="bg-blue-950 sticky top-0 z-10">
//           <tr>
//             {columns.map((col, idx) => (
//               <th
//                 key={idx}
//                 className="px-6 py-3 text-left font-semibold text-white uppercase"
//               >
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {data?.map((row, rowIndex) => (
//             <tr key={row.id || rowIndex} className="hover:bg-gray-50">
//               {columns.map((col, colIndex) => {
//                 const fieldKey = col.toLowerCase();
//                 const cellValue = row[fieldKey];

//                 // Toggle buttons
//                 if (toggleFields.includes(fieldKey)) {
//                   const isOn = Boolean(cellValue);
//                   return (
//                     <td key={colIndex} className="px-6 py-4 text-center">
//                       <button
//                         onClick={() =>
//                           onToggle && onToggle(fieldKey, row.id, isOn)
//                         }
//                         className="text-3xl transition-colors duration-200"
//                       >
//                         {isOn ? (
//                           <FaToggleOn className="text-red-700" />
//                         ) : (
//                           <FaToggleOff className="text-gray-500" />
//                         )}
//                       </button>
//                     </td>
//                   );
//                 }

//                 return (
//                   <td key={colIndex} className="px-6 py-4 text-sm text-gray-700">
//                     {cellValue ?? "-"}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;





// import { FaToggleOff, FaToggleOn } from "react-icons/fa";

// const Table = ({
//   columns,
//   data,
//   toggleFields = [],
//   onToggle,
//   onSelect,
//   selectedPosts = [],
//   selectable = false, // Optional prop for selecting posts
// }) => {
//   return (
//     <div className="max-h-screen overflow-x-auto shadow rounded-lg">
//       <table className="min-w-full table-auto divide-y divide-gray-200 bg-white">
//         <thead className="bg-blue-950 sticky top-0 z-10">
//           <tr>
//             {columns.map((col, idx) => (
//               <th
//                 key={idx}
//                 className="px-6 py-3 text-left font-semibold text-white uppercase"
//               >
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {data?.map((row, rowIndex) => (
//             <tr key={row.id || rowIndex} className="hover:bg-gray-50">
//               {columns.map((col, colIndex) => {
//                 const fieldKey = col.toLowerCase();
//                 const cellValue = row[fieldKey];

//                 // Select checkbox if selectable is true
//                 if (selectable && col === "Select") {
//                   return (
//                     <td key={colIndex} className="px-6 py-4 text-center">
//                       <input
//                         type="checkbox"
//                         checked={selectedPosts.includes(row.id)}
//                         onChange={() => onSelect(row.id)}
//                         className="w-5 h-5"
//                       />
//                     </td>
//                   );
//                 }

//                 // Toggle buttons
//                 if (toggleFields.includes(fieldKey)) {
//                   const isOn = Boolean(cellValue);
//                   return (
//                     <td key={colIndex} className="px-6 py-4 text-center">
//                       <button
//                         onClick={() =>
//                           onToggle && onToggle(fieldKey, row.id, isOn)
//                         }
//                         className="text-3xl transition-colors duration-200"
//                       >
//                         {isOn ? (
//                           <FaToggleOn className="text-red-700" />
//                         ) : (
//                           <FaToggleOff className="text-gray-500" />
//                         )}
//                       </button>
//                     </td>
//                   );
//                 }

//                 return (
//                   <td key={colIndex} className="px-6 py-4 text-sm text-gray-700">
//                     {cellValue ?? "-"}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;



import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const Table = ({
  columns,
  data,
  toggleFields = [],
  selectFields = [], // NEW: fields to render as <select>
  onToggle,
  onSelect,
  onSelectChange, // NEW: handle dropdown change
  selectedPosts = [],
  selectable = false,
}) => {
  const statusOptions = ["pending", "approved", "declined"];

  return (
    <div className="max-h-screen overflow-x-auto shadow rounded-lg">
      <table className="min-w-full table-auto divide-y divide-gray-200 bg-white">
        <thead className="bg-blue-950 sticky top-0 z-10">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left font-semibold text-white uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => {
                const fieldKey = col.toLowerCase();
                const cellValue = row[fieldKey];

                // Checkbox for selection
                if (selectable && col === "Select") {
                  return (
                    <td key={colIndex} className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(row.id)}
                        onChange={() => onSelect(row.id)}
                        className="w-5 h-5"
                      />
                    </td>
                  );
                }

                // Status dropdown if in selectFields
                // Select dropdown instead of toggle
                if (selectFields.includes(fieldKey)) {
                  return (
                    <td key={colIndex} className="px-6 py-4 text-center">
                      <select
                        value={cellValue}
                        onChange={(e) =>
                          onSelectChange && onSelectChange(fieldKey, row.id, e.target.value)
                        }
                        className="bg-blue-900 text-white px-2 py-1 rounded border border-gray-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                  );
                }

                // Toggle for other fields
                if (toggleFields.includes(fieldKey)) {
                  const isOn = Boolean(cellValue);
                  return (
                    <td key={colIndex} className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          onToggle && onToggle(fieldKey, row.id, isOn)
                        }
                        className="text-3xl transition-colors duration-200"
                      >
                        {isOn ? (
                          <FaToggleOn className="text-red-700" />
                        ) : (
                          <FaToggleOff className="text-gray-500" />
                        )}
                      </button>
                    </td>
                  );
                }

                return (
                  <td key={colIndex} className="px-6 py-4 text-sm text-gray-700">
                    {cellValue ?? "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
