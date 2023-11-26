import Container from "@mui/material/Container";
import Navbar from "../../components/Navbar";
import WebTitle from "../../components/WebTitle/WebTitle";
import Banner from "../../components/Home/Banner";

const Home = () => {
  return (
    <>
      <WebTitle title="Home" />
      <Container maxWidth="xl" sx={{ padding: 0, fontFamily: "roboto" }}>
        <Navbar />
        <Banner />
      </Container>
    </>
  );
};

export default Home;
