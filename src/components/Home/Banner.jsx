import { Button, Container, Grid, Typography } from "@mui/material";
import demonBanner from "/public/demoBanner.jpg";
import useBanner from "../../hooks/useBanner";
import { useEffect, useState } from "react";
import { ArrowRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Loader from "../Loader";
const Banner = () => {
  const [banner, setBanner] = useState(null);
  const { banners, isLoading } = useBanner();
  isLoading && <Loader />;
  useEffect(() => {
    if (banners) {
      banners.find((banner) => banner.isActive === true && setBanner(banner));
    }
  }, [banners]);

  return (
    <Grid
      id="Home"
      sx={{
        py: 20,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Container sx={{ height: "100%" }}>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6} lg={6} sx={{ flex: 1 }}>
            {/* Adjust the styling as needed */}
            <Typography sx={{ fontWeight: 600 }} variant="h2" color="black">
              {banner ? banner?.title : "Trusted Diagnostic Center"}
            </Typography>
            <Typography
              sx={{ fontWeight: 400, maxWidth: "70px" }}
              variant="p"
              color="black"
            >
              {banner
                ? banner?.description
                : "Welcome to the biggest Diagnostic Center in Bangladesh."}
            </Typography>
            <Grid container sx={{ mt: 2 }} alignItems="center">
              <Button
                sx={{ fontWeight: 500, mr: 3 }}
                variant="contained"
                size="medium"
              >
                {banner ? banner?.coupon : "HELLO12"}
              </Button>
              <Typography variant="span" color="#1565C0">
                {banner ? banner?.discountRate : 20}% Discount
              </Typography>
            </Grid>
            <Link style={{ textDecoration: "none" }} to={"/tests"}>
              <Button
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#21D026",
                  },
                }}
              >
                View All Test <ArrowRight />
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ flex: 1 }}>
            <img
              src={banner ? banner?.image : demonBanner}
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
