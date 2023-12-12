import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import blockAnimation from "../../../public/Animation/block.json";
import Lottie from "lottie-react";
import emailjs from "emailjs-com";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useUserInfo from "../../hooks/useUserInfo";
const BlockPage = () => {
  useEffect(() => {
    emailjs.init("rps7HsvPhdSnjADeo");
  }, []);
  const { userInfo } = useUserInfo();
  console.log(userInfo);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const templateParams = {
        to_email: e.target.userEmail.value,
        userName: e.target.userName.value,
        userEmail: e.target.userEmail.value,
        message: e.target.message.value,
      };
      console.log(templateParams);
      await emailjs.send(
        "service_aod4p0x",
        "template_g06l8ij",
        templateParams,
        "rps7HsvPhdSnjADeo"
      );
      e.target.reset();
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Error sending message. Please try again later.");
    }
  };
  return (
    <Grid
      component="main"
      container
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        placeItems: "center",
        py: 5,
      }}
    >
      <Grid item xl={3} md={4} sx={{ display: { xs: "none", md: "block" } }}>
        <Lottie animationData={blockAnimation} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={5}
        >
          <Typography variant="h5" textAlign={"center"}>
            Your Accound has been blocked by an admin.
          </Typography>
          <Typography variant="h5" textAlign={"center"}>
            Send your query into this form.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ p: 5 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Your Name"
                variant="outlined"
                name="userName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Your Email"
                variant="outlined"
                type="email"
                name="userEmail"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                name="message"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default BlockPage;
