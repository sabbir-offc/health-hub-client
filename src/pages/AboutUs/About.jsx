import { Container, Typography, Paper, Grid } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Diagnostic Center Management System
        </Typography>

        <Typography variant="body1" paragraph>
          Develop a robust Diagnostic Center Management System, a full-stack web
          application that effectively manages appointments, patient records,
          test results, and administrative tasks for a diagnostic center.
        </Typography>

        <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>
          Key Features:
        </Typography>

        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <Typography variant="body1">
              1. <strong>Effortless Appointment Management:</strong> Schedule
              appointments seamlessly, manage time slots, and avoid scheduling
              conflicts. Our user-friendly interface simplifies the appointment
              booking process for both staff and patients.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              2. <strong>Centralized Patient Records:</strong> Maintain a
              centralized database of patient records for quick access and
              efficient management. Track patient history, demographics, and
              medical details securely.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              3. <strong>Automated Test Result Handling:</strong> Experience the
              {`power of automation with our system's ability to handle and
              process test results swiftly. Reduce manual errors and enhance the
              speed of result delivery to both patients and healthcare
              professionals.`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              4. <strong>Administrative Task Optimization:</strong>
              From billing and invoicing to inventory management, our system
              automates administrative tasks to enhance productivity. Spend less
              time on paperwork and more time focusing on patient care.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              5. <strong>Secure Data Storage:</strong>
              Prioritize data security with our secure storage solutions. Ensure
              the confidentiality and integrity of patient information through
              advanced security measures.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              6. <strong>User-Friendly Interface:</strong>
              Navigate through our intuitive and user-friendly interface that
              caters to the needs of both staff and administrators. Access
              information with ease, reducing the learning curve for new users.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              7. <strong>Customizable and Scalable:</strong>
              {`Tailor the system to your diagnostic center's unique requirements.
              Our scalable architecture allows for future expansions and
              additions based on evolving needs.`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              8. <strong>Real-time Analytics:</strong>
              Make informed decisions with real-time analytics and reporting
              features. Monitor key metrics, track performance, and gain
              valuable insights to optimize operations.
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">
          {`By choosing our Diagnostic Center Management System, you're investing
          in a comprehensive solution that enhances efficiency, accuracy, and
          overall management within your diagnostic center. Experience the
          future of diagnostic center operations with our state-of-the-art web
          application.`}
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
