import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PiFlagBannerFill, PiUser, PiUsersThreeBold } from "react-icons/pi";

import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { TbReportMedical } from "react-icons/tb";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Home, Logout } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import Loader from "../Loader";
const Sidebar = () => {
  const { logOut } = useAuth();
  const { userInfo, isLoading } = useUserInfo();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 240;

  const adminMenu = [
    {
      icon: <AddPhotoAlternateIcon />,
      name: "Add Banner",
      to: "/dashboard/add-banner",
    },
    {
      icon: <PiFlagBannerFill />,
      name: "All Banners",
      to: "/dashboard/banners",
    },
    {
      icon: <PostAddIcon />,
      name: "Add Test",
      to: "/dashboard/add-test",
    },
    {
      icon: <TbReportMedical size={24} />,
      name: "All Tests",
      to: "/dashboard/all-tests",
    },
    {
      icon: <ImportContactsIcon />,
      name: "Add Appoinment",
      to: "/dashboard/add-appoinment",
    },
    {
      icon: <PiUsersThreeBold />,
      name: "All Users",
      to: "/dashboard/all-users",
    },
  ];
  if (isLoading) return <Loader />;
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {userInfo?.role === "admin" && (
        <List>
          {adminMenu.map((text) => (
            <NavLink
              key={text.to}
              to={text.to}
              className={({ isActive }) =>
                isActive ? "active-lnk" : "disactive-lnk"
              }
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText
                    primary={text.name}
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      )}
      <Divider />
      <List>
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
        </NavLink>
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "active-lnk" : "disactive-lnk"
          }
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PiUser />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItemButton>
          </ListItem>
        </NavLink>

        <ListItem disablePadding>
          <ListItemButton onClick={() => logOut()}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
