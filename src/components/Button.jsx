const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 red-button text-white font-bold rounded transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
