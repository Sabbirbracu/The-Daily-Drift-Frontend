import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const Table = ({
  columns,
  data,
  toggleFields = [],
  selectFields = [],
  onToggle,
  onSelect,
  onSelectChange,
  selectedPosts = [],
  selectable = false,
  style = "default", // default | dark | light | custom
  customStyle = {}, // custom class overrides
}) => {
  const statusOptions = ["pending", "approved", "declined"];

  const styleThemes = {
    default: {
      table: "min-w-full table-auto divide-y divide-gray-200 bg-white",
      thead: "bg-blue-950 sticky top-0 z-10",
      th: "px-6 py-3 text-left font-semibold text-white uppercase",
      td: "px-6 py-4 text-sm text-gray-700",
      trHover: "hover:bg-gray-50",
      select: "bg-blue-900 text-white px-2 py-1 rounded border border-gray-300",
    },
    dark: {
      table: "min-w-full table-auto divide-y divide-gray-700 bg-gray-900 text-white rounded-md border border-gray-700",
      thead: "bg-gray-800 sticky top-0 z-10",
      th: "px-6 py-3 text-left font-semibold text-white uppercase",
      td: "px-6 py-4 text-sm text-gray-300",
      trHover: "hover:bg-gray-800",
      select: "bg-gray-700 text-white px-2 py-1 rounded border border-gray-600",
    },
    light: {
      table: "min-w-full table-auto divide-y divide-gray-100 bg-white",
      thead: "bg-gray-100 sticky top-0 z-10",
      th: "px-6 py-3 text-left font-semibold text-gray-700 uppercase",
      td: "px-6 py-4 text-sm text-gray-800",
      trHover: "hover:bg-gray-50",
      select: "bg-white text-gray-800 px-2 py-1 rounded border border-gray-300",
    },
  };

  const currentStyle = {
    ...styleThemes[style] || styleThemes["default"],
    ...customStyle,
  };

  return (
    <div className="max-h-screen overflow-x-auto shadow rounded-lg">
      <table className={currentStyle.table}>
        <thead className={currentStyle.thead}>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={currentStyle.th}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className={currentStyle.trHover}>
              {columns.map((col, colIndex) => {
                const fieldKey = col.toLowerCase();
                const cellValue = row[fieldKey];

                // Selection checkbox
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

                // Dropdown selector
                if (selectFields.includes(fieldKey)) {
                  return (
                    <td key={colIndex} className="px-6 py-4 text-center">
                      <select
                        value={cellValue}
                        onChange={(e) =>
                          onSelectChange && onSelectChange(fieldKey, row.id, e.target.value)
                        }
                        className={currentStyle.select}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  );
                }

                // Toggle button
                if (toggleFields.includes(fieldKey)) {
                  const isOn = Boolean(cellValue);
                  return (
                    <td key={colIndex} className="px-6 py-4 text-center">
                      <button
                        onClick={() => onToggle && onToggle(fieldKey, row.id, isOn)}
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
                  <td key={colIndex} className={currentStyle.td}>
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
