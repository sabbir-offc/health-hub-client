import Avatar from "@mui/material/Avatar";
import LoginAnimation from "../../../public/Animation/login.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { ImSpinner5 } from "react-icons/im";

const Login = () => {
  const { loading, setLoading, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const toastId = toast.loading("Logging...");
      await signIn(email, password)
        .then(() => {
          toast.success("Logged In Successfully", { id: toastId });
          navigate("/");
        })

        .catch(() => {
          toast.error("Login Failed", { id: toastId });
        });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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
                "Login"
              )}
            </Button>
            <Grid container>
              <Grid item>
                <Typography>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
