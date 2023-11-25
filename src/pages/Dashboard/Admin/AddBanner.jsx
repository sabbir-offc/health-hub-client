import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner5 } from "react-icons/im";

import toast from "react-hot-toast";
import { imageUpload } from "../../../api/imageUpload";
import { uploadBanner } from "../../../api/admin";
const AddBanner = () => {
  const [imgBtnText, setImgBtnText] = useState("Upload Banner Image");
  const [selectedImg, setSelectedImg] = useState(undefined);
  const [loading, setLoading] = useState(false);
  //hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const title = data.title;
    const description = data.description;
    const coupon = data.coupon;
    const discountRate = data.discountRate;
    try {
      setLoading(true);
      const { data } = await imageUpload(selectedImg);
      const bannerInfo = {
        title,
        image: data?.display_url,
        description,
        coupon,
        isActive: false,
        discountRate: parseInt(discountRate),
      };

      const res = await uploadBanner(bannerInfo).then();
      if (res.acknowledged) {
        toast.success("Banner Uploaded Successfully");
      }
    } catch (error) {
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
          <Typography component="h1" variant="h5">
            Add Banner For Home Page
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("title", { maxLength: 35 })}
                  margin="normal"
                  fullWidth
                  required
                  id="title"
                  label="Banner Title"
                  name="title"
                  autoFocus
                  type="text"
                  autoComplete="title"
                />
              )}
            />
            {errors?.title?.type === "maxLength" && (
              <Typography variant="span" color="red">
                {"Title characters length shouldn't be greater than 30"}
              </Typography>
            )}

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
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("description", {
                    maxLength: 90,
                  })}
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  type="text"
                  id="description"
                  label="Banner Description"
                  name="description"
                  autoComplete="description"
                />
              )}
            />
            {errors?.description?.type === "maxLength" && (
              <Typography variant="span" color="red">
                {"Description characters length shouldn't be greater than 90"}
              </Typography>
            )}
            <Controller
              name="coupon"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("coupon", { required: true })}
                  margin="normal"
                  fullWidth
                  name="coupon"
                  label="Coupon Code"
                  type="text"
                  id="coupon"
                />
              )}
            />
            {errors?.coupon?.type === "required" && (
              <Typography variant="span" color="red">
                Coupon Code Is required.
              </Typography>
            )}

            <Controller
              name="discountRate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("discountRate", {
                    required: true,
                  })}
                  margin="normal"
                  fullWidth
                  name="discountRate"
                  label="Discount Rate"
                  type="text"
                  id="discountRate"
                />
              )}
            />
            {errors?.discountRate?.type === "required" && (
              <Typography variant="span" color="red">
                Discount rate is required.
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
                "Upload"
              )}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddBanner;
