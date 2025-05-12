import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AuthProvider } from "./Context/AuthContext";
import Store from "./app/store";
import "./index.css";
import RootRouter from "./routes/RootRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <AuthProvider>
        <RootRouter />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
