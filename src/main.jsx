import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./app/store"; // adjust path as needed
import "./index.css";
import RootRouter from "./routes/RootRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RootRouter />
    </Provider>
  </React.StrictMode>
);
