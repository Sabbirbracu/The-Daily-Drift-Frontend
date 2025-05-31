const Button = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white font-bold rounded transition duration-300 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
