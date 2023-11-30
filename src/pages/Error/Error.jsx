import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
      >
        <Typography
          variant="h3"
          color="error"
          gutterBottom
          textAlign={"center"}
        >
          Oops! Something went wrong.
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          The page you are looking for might be temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          color="primary"
          size="large"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
