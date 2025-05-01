import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "/Users/sabbirahmad/The Daily Drift/frontend/src/index.css";
import { initSessionTracking } from '/sessionTracker.js';

initSessionTracking(); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
