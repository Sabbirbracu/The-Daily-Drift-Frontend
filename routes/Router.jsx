import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import App from "../src/App";

const Router = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Router>
    </BrowserRouter>
  );
};

export default Router;
