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
  style = "default",
  customStyle = {},
}) => {
  const statusOptions = ["pending", "approved", "declined"];

  const styleThemes = {
    default: {
      table: "min-w-full divide-y divide-gray-200 bg-white rounded-lg overflow-hidden",
      thead: "bg-blue-950 text-white sticky top-0 shadow-sm z-10",
      th: "px-6 py-3 text-left text-xs font-bold uppercase tracking-wider",
      td: "px-6 py-4 text-sm text-gray-800",
      trHover: "hover:bg-blue-50 transition-all duration-150",
      select:
        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
    },
    dark: {
      table: "min-w-full divide-y divide-gray-700 bg-gray-900 text-white rounded-md",
      thead: "bg-gray-800 sticky top-0 z-10",
      th: "px-6 py-3 text-left text-xs font-bold uppercase tracking-wider",
      td: "px-6 py-4 text-sm text-gray-300",
      trHover: "hover:bg-gray-800 transition-all duration-150",
      select:
        "mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
    },
    light: {
      table: "min-w-full divide-y divide-gray-100 bg-white",
      thead: "bg-gray-100 sticky top-0 z-10",
      th: "px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700",
      td: "px-6 py-4 text-sm text-gray-800",
      trHover: "hover:bg-gray-50",
      select:
        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
    },
  };

  const currentStyle = {
    ...styleThemes[style] || styleThemes["default"],
    ...customStyle,
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className={`${currentStyle.table} w-full`}>
        <thead className={currentStyle.thead}>
          <tr className="hidden md:table-row">
            {columns.map((col, idx) => (
              <th key={idx} className={currentStyle.th}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={`${currentStyle.trHover} border-b border-gray-100 block md:table-row`}
            >
              {columns.map((col, colIndex) => {
                const fieldKey = col.toLowerCase();
                const cellValue = row[fieldKey];

                // Selection checkbox
                if (selectable && col === "Select") {
                  return (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-center block md:table-cell"
                      data-label={col}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(row.id)}
                        onChange={() => onSelect(row.id)}
                        className="w-5 h-5 accent-blue-600"
                      />
                    </td>
                  );
                }

                // Dropdown selector
                if (selectFields.includes(fieldKey)) {
                  const selectColor =
                    cellValue === "approved"
                      ? "bg-green-600 text-white"
                      : cellValue === "declined"
                      ? "bg-red-600 text-white"
                      : "bg-yellow-400 text-black";

                  return (
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-center block md:table-cell"
                      data-label={col}
                    >
                      <select
                        value={cellValue}
                        onChange={(e) =>
                          onSelectChange && onSelectChange(fieldKey, row.id, e.target.value)
                        }
                        className={`${currentStyle.select} ${selectColor}`}
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
                    <td
                      key={colIndex}
                      className="px-6 py-4 text-center block md:table-cell"
                      data-label={col}
                    >
                      <button
                        onClick={() => onToggle && onToggle(fieldKey, row.id, isOn)}
                        className="text-3xl transition-colors duration-200"
                      >
                        {isOn ? (
                          <FaToggleOn className="text-green-600" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
                        )}
                      </button>
                    </td>
                  );
                }

                return (
                  <td
                    key={colIndex}
                    className={`${currentStyle.td} block md:table-cell before:content-[attr(data-label)] before:block before:font-semibold before:text-gray-500 md:before:hidden`}
                    data-label={col}
                  >
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
