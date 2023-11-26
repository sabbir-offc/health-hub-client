import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import AddBanenr from "../pages/Dashboard/Admin/AddBanner";
import BannerList from "../pages/Dashboard/Admin/BannerList";
import AddTest from "../pages/Dashboard/Admin/AddTest";
import PrivateRoute from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import Profile from "../pages/Dashboard/Common/Profile";
import Users from "../pages/Dashboard/Admin/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      //admin routes
      {
        path: "add-banner",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AddBanenr />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "banners",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <BannerList />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "add-test",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AddTest />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <Users />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },

      //common routes
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
