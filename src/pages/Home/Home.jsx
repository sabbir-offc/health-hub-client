import Container from "@mui/material/Container";
import WebTitle from "../../components/WebTitle/WebTitle";
import Banner from "../../components/Home/Banner";
import { Box, Divider, Typography } from "@mui/material";
import FeaturedTest from "./Tests/FeaturedTest";

const Home = () => {
  return (
    <>
      <WebTitle title="Home" />
      <Container maxWidth="xl" sx={{ padding: 0, fontFamily: "roboto" }}>
        <Banner />
        <Box>
          <Typography variant="h4" fontWeight={500} color={"#4CAF50"}>
            Featured Tests
          </Typography>
          <Divider />
          <FeaturedTest />
        </Box>
      </Container>
    </>
  );
};

export default Home;
