import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
const Main = () => {
  return (
    <Container maxWidth="xl">
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Main;
