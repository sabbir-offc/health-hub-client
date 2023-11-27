import { Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
import useUserInfo from "../hooks/useUserInfo";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
const Main = () => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) return <Loader />;
  if (userInfo?.status === "blocked") {
    return <Navigate to="/login" />;
  }
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default Main;
