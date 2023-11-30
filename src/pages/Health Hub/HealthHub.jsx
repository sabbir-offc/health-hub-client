import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const HealthHub = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" mb={4}>
        Health Hub
      </Typography>

      {/* Wellness Tips Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Wellness Tips
              </Typography>
              <Typography>
                Discover tips on maintaining a healthy lifestyle, including
                information on nutrition, exercise, and mental well-being.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Medical Conditions Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Medical Conditions
              </Typography>
              <Typography>
                Learn about common medical conditions, their symptoms, and
                preventive measures to stay informed about your health.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Preventive Care Section */}
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Preventive Care
              </Typography>
              <Typography>
                Understand the importance of regular check-ups and preventive
                screenings. Discover how diagnostic tests contribute to early
                detection.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Interactive Tools Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Interactive Tools
              </Typography>
              <Typography>
                Engage with our interactive tools, including BMI calculators,
                calorie counters, and risk assessment quizzes to monitor your
                health.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Healthy Recipes Section */}
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Healthy Recipes
              </Typography>
              <Typography>
                Explore a collection of healthy recipes and meal plans to
                support a balanced diet and overall well-being.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Blog or Articles Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Blog & Articles
              </Typography>
              <Typography>
                Stay updated with our blog and articles section, featuring
                in-depth content on healthcare, diagnostics, and medical
                advancements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HealthHub;
