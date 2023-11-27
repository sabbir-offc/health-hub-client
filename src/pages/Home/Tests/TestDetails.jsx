import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../../components/Home/Test/BookingModal";
import { useEffect, useState } from "react";
import useBanner from "../../../hooks/useBanner";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";

const TestDetails = () => {
  const test = useLoaderData();
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState(null);
  const { banners, isLoading } = useBanner();
  const [discountRate, setDiscountRate] = useState(null);
  const [stripeP, setStripeP] = useState(null);
  const [appoinmentInfo, setAppoinmentInfo] = useState(null);
  const { user } = useAuth();
  const handleClose = () => {
    setOpen(false);
    setDiscountRate(null);
    setStripeP(null);
  };
  isLoading && <Loader />;
  useEffect(() => {
    if (banners) {
      banners.find((banner) => banner.isActive === true && setBanner(banner));
    }
  }, [banners]);
  const { title, details, date, image, price, slots, _id } = test;
  const dbDate = new Date(date);
  const modifiedDate = dbDate.toLocaleDateString("en-GB");

  //calculating discount rate
  const handleDiscount = (e) => {
    e.preventDefault();
    const discountCode = e.target.discountPrice.value;
    if (discountCode === banner?.coupon) {
      const discountAmount = (banner?.discountRate / 100) * price;
      const discountedPrice = price - discountAmount;
      setDiscountRate(discountedPrice);
      const info = {
        user: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
        date: date,
        price: discountedPrice,
        title: title,
        testId: _id,
        image: image,
      };
      setAppoinmentInfo(info);
      const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
      setStripeP(stripePromise);
    }
  };

  return (
    <Grid my={"20px"} padding={"15px"}>
      <Grid
        container
        gap={"20px"}
        my={"10px"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Grid item>
          <img
            src={image}
            alt=""
            style={{ borderRadius: "10px" }}
            width={"100%"}
          />
        </Grid>
        <Grid item>
          <Typography variant="h4" fontWeight={500}>
            Test Name: {title}
          </Typography>
          <Typography variant="h5" fontWeight={450}>
            Date: {modifiedDate}
          </Typography>
          <Typography variant="h5" fontWeight={400}>
            Price: {price}
          </Typography>
          <Typography variant="h5" fontWeight={400}>
            Slots Left: {slots}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ my: "10px", backgroundColor: "#FF5722" }}
          >
            Book Now
          </Button>
          <BookingModal
            stripePromise={stripeP}
            banner={banner}
            appoinmentInfo={appoinmentInfo}
            open={open}
            test={test}
            handleClose={handleClose}
            handleDiscount={handleDiscount}
            discountRate={discountRate}
          />
        </Grid>
      </Grid>
      <Divider
        sx={{
          width: "80%",
          my: 1,
          mx: "auto",
          border: "1px solid",
        }}
      />
      <Paper elevation={4} sx={{ padding: "8px", my: "5px" }}>
        <Typography
          variant="h5"
          fontWeight={500}
          sx={{ textDecoration: "underline" }}
        >
          Test Details:
        </Typography>
        <Typography variant="subtitle1">{details}</Typography>
      </Paper>
    </Grid>
  );
};

export default TestDetails;
