import {
  Button,
  Container,
  Grid,
  ImageListItem,
  Typography,
} from "@mui/material";
import demonBanner from "/public/demoBanner.jpg";
const Banner = () => {
  return (
    <Grid
      id="Home"
      sx={{
        maxHeight: "85vh",
        py: 28,
        // backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${demonBanner})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Container sx={{ height: "100%" }}>
        <Grid
          container
          sx={{ display: "flex" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6} lg={6} sx={{ flex: 1 }}>
            {/* Adjust the styling as needed */}
            <Typography sx={{ fontWeight: 600 }} variant="h2" color="black">
              Trusted Diagnostic Center
            </Typography>
            <Typography sx={{ fontWeight: 400 }} variant="p" color="black">
              Welcome to the biggest Diagnostic Center in Bangladesh.
            </Typography>
            <Grid container sx={{ mt: 2 }} alignItems="center">
              <Button
                sx={{ fontWeight: 500, mr: 3 }}
                variant="contained"
                size="medium"
              >
                HAPPY22
              </Button>
              <Typography variant="span" color="#1565C0">
                20% Discount
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ flex: 1 }}>
            <img
              src={demonBanner}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Banner;
