import { Container, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{
        py: 4,
        backgroundColor: "#f5f5f5",
        textAlign: "center",
      }}
    >
      {/* Logo Section */}
      <Typography variant="h5" color="primary" mb={2}>
        Health Hub
      </Typography>

      {/* Navigation Links */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button color="primary">Home</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/tests" style={{ textDecoration: "none" }}>
            <Button color="primary">Tests</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <Button color="primary">About Us</Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <Button color="primary">Contact Us</Button>
          </Link>
        </Grid>
      </Grid>

      {/* Copyright Text */}
      <Typography variant="body2" color="textSecondary" mt={2}>
        &copy; 2023 Health Hub. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
