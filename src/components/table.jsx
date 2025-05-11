import { FaToggleOff, FaToggleOn } from "react-icons/fa";

const Table = ({ columns, data, toggleFields = [], onToggle }) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full table-auto divide-y divide-gray-200 bg-white">
        <thead className="bg-blue-800 sticky top-0 z-10">
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

                // Toggle buttons
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
                          <FaToggleOn className="text-green-600" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
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
