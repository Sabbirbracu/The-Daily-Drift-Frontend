
const Modal = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  onClose,
  textColor = "text-blue-600", // Default to blue text
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Modal content card */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <h2 className={`text-xl font-bold ${textColor}`}>Confirm Action</h2>
        <p className="my-4 text-gray-700">{message}</p>
        <div className="flex justify-between">
          <button
            className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded px-4 py-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white hover:bg-blue-600 rounded px-4 py-2"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
