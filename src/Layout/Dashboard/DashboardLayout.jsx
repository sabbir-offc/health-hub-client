import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar";

const drawerWidth = 240;

const DashboardLayout = () => {
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
