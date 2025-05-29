// src/components/Spinner.jsx
const Spinner = ({ size = "md", color = "blue" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  const borderColor = {
    blue: `border-${color}-500 border-t-transparent`,
    white: `border-white border-t-transparent`,
    gray: `border-gray-500 border-t-transparent`,
  };

  return (
    <div
      className={`animate-spin rounded-full ${sizes[size]} ${
        borderColor[color] || borderColor.blue
      }`}
    />
  );
};

export default Spinner;
