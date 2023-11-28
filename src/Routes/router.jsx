import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import AddBanenr from "../pages/Dashboard/Admin/AddBanner";
import BannerList from "../pages/Dashboard/Admin/BannerList";
import PrivateRoute from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import Profile from "../pages/Dashboard/Common/Profile";
import Users from "../pages/Dashboard/Admin/Users";
import AddTest from "../pages/Dashboard/Admin/Tests/AddTest";
import AllTests from "../pages/Dashboard/Admin/Tests/AllTests";
import UpdateTest from "../pages/Dashboard/Admin/Tests/UpdateTest";
import { singleTest } from "../api/admin";
import TestDetails from "../pages/Home/Tests/TestDetails";
import UpcomingAppointments from "../pages/Dashboard/User/UpcomingAppointments";
import TestReservation from "../pages/Dashboard/Admin/Tests/TestReservation";
import AllTestPage from "../pages/Home/Tests/AllTest/AllTestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tests",
        element: <AllTestPage />,
      },
      {
        path: "test/:id",
        element: (
          <PrivateRoute>
            <TestDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => singleTest(params.id),
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
        path: "all-tests",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <AllTests />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "test-reservation",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <TestReservation />
            </AdminRoutes>
          </PrivateRoute>
        ),
      },
      {
        path: "update-test/:id",
        element: (
          <PrivateRoute>
            <AdminRoutes>
              <UpdateTest />
            </AdminRoutes>
          </PrivateRoute>
        ),
        loader: ({ params }) => singleTest(params.id),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            {/* <AdminRoutes> */}
            <Users />
            {/* </AdminRoutes> */}
          </PrivateRoute>
        ),
      },

      //user routes
      {
        path: "my-appointments",
        element: (
          <PrivateRoute>
            <UpcomingAppointments />
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
