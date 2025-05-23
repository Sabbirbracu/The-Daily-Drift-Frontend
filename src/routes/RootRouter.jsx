import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import About from "../components/about.jsx";
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import AllPosts from "../Pages/AllPosts.jsx";
import Contact from "../Pages/contact.jsx";
import CreatePost from "../Pages/CreatePost.jsx";
import EditePost from "../Pages/EditePost.jsx";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import ManagePosts from "../Pages/ManagePosts.jsx";
import ManageUsers from "../Pages/ManageUsers.jsx";
import NotFound from "../Pages/NotFound.jsx";
import Register from "../Pages/Register.jsx";
import SinglePost from "../Pages/SinglePost.jsx";
import UserDashboard from "../Pages/UserDashboard.jsx";
import UserDashboardPost from "../Pages/UserDashboardPost.jsx";
import UserProfile from "../Pages/UserProfile.jsx";

import AdminLayout from "../layouts/AdminLayouts.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import EditeProfilePage from "../Pages/EditeProfilePage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/post/:id" element={<SinglePost />} />

          {/* user routes */}
          <Route path="/dashboard-user" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="post" element={<UserDashboardPost />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="edit-profile" element={<EditeProfilePage />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="edite-post/:id" element={<EditePost />} />
          </Route>

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
            <Route path="profile" element={<UserProfile />} />
            <Route path="edit-profile" element={<EditeProfilePage />} />
          </Route>
        </Route>

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
