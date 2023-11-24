import Avatar from "@mui/material/Avatar";
import LoginAnimation from "../../../public/Animation/login.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import districts from "../../../public/districts.json";
import upazillas from "../../../public/upazilla.json";
const Register = () => {
  const [blood, setBlood] = useState("A+");
  const [district, setDistrict] = useState("Dhaka");
  const [imgBtnText, setImgBtnText] = useState("Upload Your Image");
  const [upazilla, setUpazilla] = useState("Savar");
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const image = form.image?.files[0];

    const userInfo = {
      name,
      image,
    };
    console.log(userInfo);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    textAlign: "left",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleImageTxt = (image) => {
    setImgBtnText(image.name);
  };

  return (
    <Grid
      //   component="main"
      container
      sx={{
        display: "flex",
        py: 5,
        justifyContent: "center",
        placeItems: "center",
      }}
    >
      <Grid item xl={3} sm={5} md={4}>
        <Lottie animationData={LoginAnimation} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoFocus
              autoComplete="name"
            />
            <Button
              component="label"
              required
              fullWidth
              sx={{
                my: 2,
              }}
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              {imgBtnText}
              <VisuallyHiddenInput
                type="file"
                name="image"
                required
                onChange={(e) => handleImageTxt(e.target.files[0])}
              />
            </Button>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={blood}
                label="Blood Group"
                onChange={(e) => setBlood(e.target.value)}
              >
                {bloodGroups.map((gc) => (
                  <MenuItem key={gc} value={gc}>
                    {gc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">Districts</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={district}
                label="Districts"
                onChange={(e) => setDistrict(e.target.value)}
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.name}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="demo-simple-select-label">Upazilla</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={upazilla}
                label="Upazilla"
                onChange={(e) => setUpazilla(e.target.value)}
              >
                {upazillas.map((upazilla) => (
                  <MenuItem key={upazilla.id} value={upazilla.name}>
                    {upazilla.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Typography>
                  <Link to="/login">{"Already have an account? Login"}</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
