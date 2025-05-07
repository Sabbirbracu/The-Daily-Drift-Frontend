import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.jsx";

import PrivateRoute from "../components/PrivateRoute.jsx";
import UserDashboardPost from "../components/UserDashboardPost.jsx";
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import CreatePost from "../Pages/CreatePost.jsx";

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

          <Route path="/Register" element={<Register />} />
          <Route path="/dashboard-user" element={<UserDashboard />} />

          {/* Admin Routes */}

          <Route
            path="/dashboard-admin"
            element={
              <PrivateRoute>

                {" "}
                {/* Ensure PrivateRoute checks authentication */}
                <AdminDashboard />

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
