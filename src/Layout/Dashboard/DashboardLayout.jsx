import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";
import useUserInfo from "../../hooks/useUserInfo";
import Loader from "../../components/Loader";
const drawerWidth = 240;
const DashboardLayout = () => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) return <Loader />;
  if (userInfo?.status === "blocked") {
    return <Navigate to="/login" />;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
