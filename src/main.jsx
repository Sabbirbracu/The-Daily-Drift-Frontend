import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "../app/store.js";
import "./index.css";
import RootRouter from "./routes/RootRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RootRouter />
    </Provider>
  </React.StrictMode>
);
