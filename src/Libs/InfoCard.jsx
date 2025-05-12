const InfoCard = ({ title, details }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <ul className="space-y-2 text-sm text-gray-300">
      {details.map(([label, value], index) => (
        <li key={index} className="flex justify-between">
          <span className="font-medium">{label}:</span>
          <span className="text-right">{value ? value : "N/A"}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default InfoCard;
