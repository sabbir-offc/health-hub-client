import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Dashboard;
