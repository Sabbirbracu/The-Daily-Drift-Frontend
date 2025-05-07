import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import UserDashboardPost from "../components/UserDashboardPost.jsx";
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import CreatePost from "../Pages/CreatePost.jsx";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import UserDashboard from "../Pages/UserDashboard.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Dashboard with relative nested route */}
          <Route path="/dashboard-user" element={<UserDashboard />}>
            <Route path="post" element={<UserDashboardPost />} />
            <Route path="create-post" element={<CreatePost />} />
            {/* This is relative */}
          </Route>

          {/* Admin Dashboard protected by PrivateRoute */}
          <Route
            path="/dashboard-admin"
            element={
              <PrivateRoute>
                {" "}
                {/* Ensure PrivateRoute checks authentication */}
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
