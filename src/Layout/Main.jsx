import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Navbar";
const Main = () => {
  return (
    <>
      <Container
        sx={{ fontFamily: "roboto", minHeight: "calc(100vh - 225px)" }}
        maxWidth="xl"
      >
        <Navbar />
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Main;
