
const InfoCard = ({ title, details }) => (
  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
    {/* Title with subtle gradient bar */}
    <div className="mb-5">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="h-1 mt-1 w-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full" />
    </div>

    <ul className="space-y-4 text-sm">
      {details.map(([label, value], index) => (
        <li
          key={index}
          className="flex justify-between items-start border-b border-gray-700 pb-2"
        >
          <span className="text-gray-400 font-medium">{label}</span>
          <span className="text-gray-200 text-right max-w-[60%] break-words">
            {value || "N/A"}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default InfoCard;
