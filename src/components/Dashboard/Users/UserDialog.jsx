import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Typography } from "@mui/material";

const UserDialog = ({
  user,
  handleBlock,
  handleActive,
  loading,
  handleMakeAdmin,
  handleMakeUser,
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { name, email, role, status, _id, blood, district, upazilla } = user;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        See Info
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Email: {email}</DialogContentText>
          <DialogContentText>Blood Group: {blood}</DialogContentText>
          <DialogContentText>District: {district}</DialogContentText>
          <DialogContentText>Upazilla: {upazilla}</DialogContentText>
          <DialogContentText>
            Role:{" "}
            <Typography variant="span" textTransform={"uppercase"}>
              {role}
            </Typography>
          </DialogContentText>
          <DialogContentText>
            Status:{" "}
            <Typography variant="span" textTransform={"uppercase"}>
              {status}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {status === "active" ? (
            <Button
              onClick={() => handleBlock(_id)}
              variant="outlined"
              color="error"
            >
              {loading ? "Updating..." : "Block user"}
            </Button>
          ) : (
            <Button
              onClick={() => handleActive(_id)}
              variant="contained"
              color="success"
            >
              {loading ? "Updating" : "Active User"}
            </Button>
          )}
          {role === "admin" ? (
            <Button
              onClick={() => handleMakeUser(_id)}
              variant="outlined"
              color="error"
            >
              {loading ? "Updating..." : "Make User"}
            </Button>
          ) : (
            <Button
              onClick={() => handleMakeAdmin(_id)}
              variant="contained"
              color="success"
            >
              {loading ? "Updating" : "Make Admin"}
            </Button>
          )}
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
UserDialog.propTypes = {
  user: PropTypes.object,
  handleBlock: PropTypes.func,
  handleActive: PropTypes.func,
  handleMakeUser: PropTypes.func,
  handleMakeAdmin: PropTypes.func,
  loading: PropTypes.bool,
};
export default UserDialog;
