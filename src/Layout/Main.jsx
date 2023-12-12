import { Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Navbar";
import useUserInfo from "../hooks/useUserInfo";
import Loader from "../components/Loader";

const Main = () => {
  const { userInfo, isLoading } = useUserInfo();
  if (isLoading) return <Loader />;
  if (userInfo?.status === "blocked") return <Navigate to={"/block"} />;

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
