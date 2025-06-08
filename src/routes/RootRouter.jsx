import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import About from "../components/about.jsx";
import PrivacyPolicy from "../components/Privacy&Policy.jsx";
import TermsAndConditions from "../components/Terms&Condition.jsx";
import AdminLayout from "../layouts/AdminLayouts.jsx";
import UserLayout from "../layouts/UserLayout.jsx";
import Category from "../Pages/AdminCategory.jsx";
import AdminDashboard from "../Pages/AdminDashboard.jsx";
import AllPosts from "../Pages/AllPosts.jsx";
import Contact from "../Pages/contact.jsx";
import CreatePost from "../Pages/CreatePost.jsx";
import EditeProfilePage from "../Pages/EditeProfilePage.jsx";
import EditPost from "../Pages/EditPost.jsx";
import ForgotPassword from "../Pages/ForgetPassword";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import ManagePosts from "../Pages/ManagePosts.jsx";
import ManageUsers from "../Pages/ManageUsers.jsx";
import NotFound from "../Pages/NotFound.jsx";
import ProfileDetailsPage from "../Pages/profileDetails.jsx";
import PublicProfilePage from "../Pages/publicProfilePage.jsx";
import Register from "../Pages/Register.jsx";
import ResetPassword from "../Pages/ResetPassword.jsx";
import SinglePost from "../Pages/SinglePost.jsx";
import UserDashboard from "../Pages/UserDashboard.jsx";
import UserDashboardPost from "../Pages/UserDashboardPost.jsx";
import UserProfile from "../Pages/UserProfile.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* user routes */}
          <Route path="/dashboard-user" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="post" element={<UserDashboardPost />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="edit-profile" element={<EditeProfilePage />} />
            <Route path="profile-details/:displayName" element={<ProfileDetailsPage />} /> {/* ✅ New Route */}
            <Route path="create-post" element={<CreatePost />} />
            <Route path="edit-post/:id" element={<EditPost />} />
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
            <Route path="category" element={<Category />} />
            <Route path="create-post" element={<CreatePost />} />
          </Route>

          {/* Public user profile route */}
          <Route path="/author/:displayName" element={<PublicProfilePage />} /> {/* ✅ New Route */}
        </Route>

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};


export default AppRoutes;
