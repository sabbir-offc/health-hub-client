import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";

const BookingModal = ({
  handleClose,
  open,
  test,
  appoinmentInfo,
  handleDiscount,
  discountRate,
  stripePromise,
}) => {
  const { title, date, price } = test;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  console.log(discountRate);
  const dbDate = new Date(date);
  const modifiedDate = dbDate.toLocaleDateString("en-GB");
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Review Info Before Book
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Test Name: {title}</DialogContentText>
          <DialogContentText>Test Price: {price}</DialogContentText>
          <DialogContentText>Test Date: {modifiedDate}</DialogContentText>
          <Box component={"form"} onSubmit={handleDiscount}>
            <TextField
              label={"Have any promo code?"}
              name="discountPrice"
              required
              sx={{ mt: 3, mb: 1 }}
            ></TextField>
            <br></br>
            <Grid display={"flex"}>
              <Button type="submit" variant="contained" sx={{ mb: 2 }}>
                Apply Code
              </Button>
              {discountRate && (
                <Typography
                  variant="p"
                  mt={"8px"}
                  ml={"2px"}
                  fontFamily={"roboto"}
                >
                  Discount Price: {discountRate}
                </Typography>
              )}
            </Grid>
          </Box>
        </DialogContent>

        {stripePromise && (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              appoinmentInfo={appoinmentInfo}
              closeModal={handleClose}
            />
          </Elements>
        )}
      </Dialog>
    </>
  );
};

BookingModal.propTypes = {
  handleClose: PropTypes.func,
  handleDiscount: PropTypes.func,
  open: PropTypes.bool,
  test: PropTypes.object,
  appoinmentInfo: PropTypes.object,
  discountRate: PropTypes.number,
  stripePromise: PropTypes.object,
};
export default BookingModal;
