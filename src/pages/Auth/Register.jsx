import Avatar from "@mui/material/Avatar";
import DoctorAnimation from "../../../public/Animation/doctor.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
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
import { Controller, useForm } from "react-hook-form";
import { ImSpinner5 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
//json file for districts and upazillas
import districts from "../../../public/districts.json";
import upazillas from "../../../public/upazilla.json";
import { imageUpload } from "../../api/imageUpload";
import { saveUser } from "../../api/auth";
import toast from "react-hot-toast";
const Register = () => {
  const [blood, setBlood] = useState("A+");
  const [district, setDistrict] = useState("Dhaka");
  const [imgBtnText, setImgBtnText] = useState("Upload Your Image");
  const [passErr, setPassErr] = useState("");
  const [selectedImg, setSelectedImg] = useState(undefined);
  const [upazilla, setUpazilla] = useState("Savar");
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const navigate = useNavigate();

  //user info
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();

  //hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password !== confirmPassword) {
      return setPassErr("Password Doesn't match");
    }
    setPassErr(null);

    const userInfo = {
      district,
      upazilla,
      blood,
    };
    const toastId = toast.loading("Account Creating...");
    try {
      setLoading(true);
      const { data } = await imageUpload(selectedImg);
      const result = await createUser(email, password);
      await updateUserProfile(name, data?.display_url);
      console.log(result);

      const dbResponse = await saveUser(result?.user, userInfo);
      console.log("object", result);
      if (dbResponse.acknowledged) {
        toast.success("Account Created Successfully", { id: toastId });
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message, { id: toastId });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //fileUpload
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
      component="main"
      container
      sx={{
        display: "flex",
        py: 5,
        justifyContent: "center",
        placeItems: "center",
      }}
    >
      <Grid item xl={4} md={4} sx={{ display: { xs: "none", md: "block" } }}>
        <Lottie animationData={DoctorAnimation} />
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoFocus
                  autoComplete="name"
                />
              )}
            />

            <Controller
              name="image"
              control={control}
              defaultValue={selectedImg}
              render={({ field }) => (
                <Button
                  component="label"
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
                    {...field}
                    required={!selectedImg}
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      handleImageTxt(selectedFile);
                      setSelectedImg(selectedFile);
                    }}
                  />
                </Button>
              )}
            />

            <Controller
              name="blood"
              control={control}
              defaultValue={blood}
              render={({ field }) => (
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel id="blood">Blood Groups</InputLabel>
                  <Select
                    {...field}
                    labelId="blood"
                    value={blood}
                    label="Blood Groups"
                    onChange={(e) => setBlood(e.target.value)}
                  >
                    {bloodGroups.map((blood) => (
                      <MenuItem key={blood} value={blood}>
                        {blood}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="district"
              control={control}
              defaultValue={district}
              render={({ field }) => (
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel id="district">Districts</InputLabel>
                  <Select
                    {...field}
                    labelId="district"
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
              )}
            />
            <Controller
              name="upazilla"
              control={control}
              defaultValue={upazilla}
              render={({ field }) => (
                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel id="upazilla">Upazilla</InputLabel>
                  <Select
                    {...field}
                    labelId="upazilla"
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
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("password", { required: true, minLength: 6 })}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              )}
            />
            {errors?.password?.type === "required" && (
              <Typography variant="span" color="red">
                Password is required.
              </Typography>
            )}
            {errors?.password?.type === "minLength" && (
              <Typography variant="span" color="red">
                Password must be greater than 6 characterrs
              </Typography>
            )}
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 6,
                  })}
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                />
              )}
            />
            {errors?.confirmPassword?.type === "required" && (
              <Typography variant="span" color="red">
                Password is required.
              </Typography>
            )}
            {passErr && (
              <Typography variant="span" color="red">
                {passErr}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <ImSpinner5
                  id="spin"
                  style={{ animation: "spin 1s linear infinite" }}
                  size={23}
                />
              ) : (
                "Register"
              )}
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
