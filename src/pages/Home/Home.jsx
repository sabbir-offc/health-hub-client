import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../components/Navbar";
import WebTitle from "../../components/WebTitle/WebTitle";
const Home = () => {
  return (
    <>
      <WebTitle title="Home" />

      <Container>
        <Navbar />
        <Typography sx={{ fontSize: 14 }}>Word of the Day</Typography>
      </Container>
    </>
  );
};

export default Home;
