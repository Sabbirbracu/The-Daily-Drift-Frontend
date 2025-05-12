import { Toaster } from "react-hot-toast"; // Use Toaster
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      {/* Main content rendered by routes */}
      <Outlet />
      <Footer />

      {/* Global Toaster for reusability */}
      <Toaster 
        position="top-right" // You can customize the position
        reverseOrder={false} // Optional: If you want latest toasts to show at the top
        toastOptions={{
          style: {
            backgroundColor: "#333", // Customize the background color
            color: "#fff", // Toast text color
          },
        }}
      />
    </div>
  );
}

export default App;
