import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import "../src/index.css";
function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
