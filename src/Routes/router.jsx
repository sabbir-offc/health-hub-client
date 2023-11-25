import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../Layout/Dashboard/DashboardLayout";
import AddBanenr from "../pages/Dashboard/Admin/AddBanner";
import BannerList from "../pages/Dashboard/Admin/BannerList";
import AddTest from "../pages/Dashboard/Admin/AddTest";
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
    element: <DashboardLayout />,
    children: [
      //admin routes
      {
        path: "add-banner",
        element: <AddBanenr />,
      },
      {
        path: "banners",
        element: <BannerList />,
      },
      {
        path: "add-test",
        element: <AddTest />,
      },
    ],
  },
]);

export default router;
