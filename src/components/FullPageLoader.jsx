// src/components/FullPageLoader.jsx
import Spinner from "./Spinner";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[9999] flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
