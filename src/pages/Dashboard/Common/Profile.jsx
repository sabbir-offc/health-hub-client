import Paper from "@mui/material/Paper";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import { useState } from "react";
import UpdateInfoForm from "../../../components/Dashboard/Profile/UpdateInfoForm";
import WebTitle from "../../../components/WebTitle/WebTitle";

const Profile = () => {
  const [show, setShow] = useState(true);
  const { user } = useAuth();
  const { userInfo } = useUserInfo();

  return (
    <>
      <WebTitle title={"Profile"} />
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
            {show ? (
              <>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",
                    width: "100px",
                    height: "100px",
                  }}
                  src={user?.photoURL}
                ></Avatar>
                <Typography component="h1" variant="h5">
                  Name: {user?.displayName}
                </Typography>
                <Typography
                  component="h1"
                  variant="h5"
                  textTransform={"uppercase"}
                >
                  Role: {userInfo?.role}
                </Typography>
                <Typography component="h1" variant="h5">
                  Email: {user?.email}
                </Typography>
                <Typography component="h1" variant="h5">
                  Blood Group: {userInfo?.blood}
                </Typography>
                <Typography component="h1" variant="h5">
                  District: {userInfo?.district}
                </Typography>
                <Typography component="h1" variant="h5">
                  Upazilla: {userInfo?.upazilla}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShow(false)}
                  color="primary"
                  sx={{ mt: "5px" }}
                >
                  Update Profile
                </Button>
              </>
            ) : (
              <UpdateInfoForm setShow={setShow} />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Profile;
