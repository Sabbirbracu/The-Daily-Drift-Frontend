import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import FullPageLoader from "./components/FullPageLoader";
import Navbar from "./components/Navbar";
import "./index.css";


function App() {
  const isLoading = useSelector((state) => state.ui.isLoading);

  return (
    <div className="bg-black min-h-screen text-white relative">
      <Navbar />

      {/* Main content rendered by routes */}
      <Outlet />

      <Footer />

      {/* Global Toaster */}
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

      {/* Full Page Loader */}
      {isLoading && <FullPageLoader />}
    </div>
  );
}


export default App;
