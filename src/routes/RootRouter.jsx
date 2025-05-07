import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import AdminProfile from "../Pages/AdminProfile.jsx";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import ManagePosts from "../Pages/ManagePosts.jsx";
import ManageUsers from "../Pages/ManageUsers.jsx";
import Register from "../Pages/Register.jsx";
import UserDashboard from "../Pages/UserDashboard.jsx";
import AdminLayout from "../layouts/AdminLayouts.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/dashboard-user" element={<UserDashboard />} />

          {/* Admin Routes */}
          <Route
            path="/dashboard-admin"
            element={
              <PrivateRoute>
                <AdminLayout /> 
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="posts" element={<ManagePosts />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
