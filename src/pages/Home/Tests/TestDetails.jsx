import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../../components/Modal/BookingModal";
import { useEffect, useState } from "react";
import useBanner from "../../../hooks/useBanner";
import Loader from "../../../components/Loader";
import useAuth from "../../../hooks/useAuth";
import WebTitle from "../../../components/WebTitle/WebTitle";
import toast from "react-hot-toast";

const TestDetails = () => {
  const test = useLoaderData();
  const { title, details, date, image, price, slots, _id } = test;
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState(null);
  const { banners, isLoading } = useBanner();
  const [discountRate, setDiscountRate] = useState(null);
  const [appointmentInfo, setAppointmentInfo] = useState(null);
  const { user } = useAuth();
  const handleClose = () => {
    setOpen(false);
    setDiscountRate(null);
    setAppointmentInfo(null);
  };

  const handleOpenModal = () => {
    if (slots > 0) return setOpen(true);

    return toast.error(
      "All slots are booked, Please try again in few days later."
    );
  };

  isLoading && <Loader />;
  useEffect(() => {
    if (banners) {
      banners?.find((banner) => banner.isActive === true && setBanner(banner));
    }
  }, [banners]);
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
        date: new Date(date),
        title,
        testId: _id,
        status: "pending",
      };
      setAppointmentInfo(info);
      console.log(date, ":", info?.date);
    } else {
      toast.error("Promocode is wrong!");
    }
  };

  return (
    <>
      <WebTitle title={title} />
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
              onClick={handleOpenModal}
              disabled={slots < 1}
              sx={{ my: "10px", backgroundColor: "#FF5722" }}
            >
              Book Now
            </Button>
            <BookingModal
              banner={banner}
              appointmentInfo={appointmentInfo}
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
    </>
  );
};

export default TestDetails;
