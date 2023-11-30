import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import emailjs from "emailjs-com";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  useEffect(() => {
    emailjs.init("rps7HsvPhdSnjADeo");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const templateParams = {
        to_email: e.target.userEmail.value,
        userName: e.target.userName.value,
        userEmail: e.target.userEmail.value,
        message: e.target.message.value,
      };

      await emailjs.send(
        "service_aod4p0x",
        "template_g06l8ij",
        templateParams,
        "rps7HsvPhdSnjADeo"
      );

      toast.success("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      toast.error("Error sending message. Please try again later.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>

        <Typography variant="body1" paragraph>
          Have questions or feedback? Reach out to us by filling out the form
          below.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Your Name"
                variant="outlined"
                name="userName"
              />
            </Grid>

            <Grid item xs={12} md={6}>
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
      </Paper>
    </Container>
  );
};

export default Contact;
