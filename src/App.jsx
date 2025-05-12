import { Toaster } from "react-hot-toast";
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
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            backgroundColor: "#333", 
            color: "#fff", 
          },
        }}
      />
    </div>
  );
}

export default App;
