import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const LineChartComponent = ({ title, data, xKey, yKey }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
        {title}
      </h2>

      <div className="w-full overflow-x-auto">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }} // <- reduced left margin
          >
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis
              width={30} // <- reduce width to use less space on the left
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke="#8884d8"
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;
