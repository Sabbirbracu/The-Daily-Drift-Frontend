import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { initSessionTracking } from "/sessionTracker.js";

// import "/Users/sabbirahmad/The Daily Drift/frontend/src/index.css";

import "../src/index.css";

initSessionTracking();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
