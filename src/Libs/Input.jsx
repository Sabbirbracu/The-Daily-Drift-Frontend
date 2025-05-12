const Input = (props) => {
  const {
    label,
    name,
    value,
    onChange,
    type = "text",
    readOnly = false,
  } = props;
  return (
    <div>
      <label className="block text-gray-300 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
    </div>
  );
};

export default Input;
