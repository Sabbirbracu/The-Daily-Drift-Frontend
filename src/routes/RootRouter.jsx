import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import AdminProfile from "../Pages/AdminProfile.jsx";
import CreatePost from "../Pages/CreatePost.jsx";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import ManagePosts from "../Pages/ManagePosts.jsx";
import ManageUsers from "../Pages/ManageUsers.jsx";
import Register from "../Pages/Register.jsx";
import UserDashboard from "../Pages/UserDashboard.jsx";
import UserDashboardPost from "../Pages/UserDashboardPost.jsx";
import UserProfile from "../Pages/UserProfile.jsx";
import AdminLayout from "../layouts/AdminLayouts.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import About from "../components/about.jsx";
import Contact from "../pages/contact.jsx"; // Adjust the path as necessary

// Within your Routes component
<Route path="/contact" element={<Contact />} />;

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* user routes */}
          <Route path="/dashboard-user" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="post" element={<UserDashboardPost />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
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
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
