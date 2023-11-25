import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ImSpinner5 } from "react-icons/im";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/imageUpload";
import { uploadBanner } from "../../../api/admin";
const AddTest = () => {
  const [imgBtnText, setImgBtnText] = useState("Upload Test Thumbnail Image");
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
        py: 2,
        justifyContent: "center",
        placeItems: "center",
      }}
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 5,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Test For Patient
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
                  label="Test Name"
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
              name="details"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  type="text"
                  id="details"
                  label="Test Details"
                  name="details"
                  autoComplete="details"
                />
              )}
            />
            <Grid
              container
              sx={{ display: { md: "flex", sm: "block" } }}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={"5px"}
            >
              <Grid item>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      {...register("price", { required: true })}
                      margin="normal"
                      name="price"
                      label="Test Price"
                      type="number"
                      id="price"
                    />
                  )}
                />
                {errors?.price?.type === "required" && (
                  <Typography
                    variant="h6"
                    color="red"
                    fontSize={"16px"}
                    fontWeight={400}
                    mt={0}
                  >
                    Price Is required.
                  </Typography>
                )}
              </Grid>
              <Grid item width={"full"}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        {...register("date", { required: true })}
                        fullWidth
                        sx={{ mt: 1, width: "full" }}
                        minDate={() => new Date()}
                        label={"Select Date"}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors?.date?.type === "required" && (
                  <Typography
                    variant="h6"
                    color="red"
                    fontSize={"16px"}
                    fontWeight={400}
                  >
                    Date Is required.
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Controller
              name="slots"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  {...register("slots", { required: true })}
                  margin="normal"
                  name="slots"
                  fullWidth
                  label="Test slots"
                  type="number"
                  id="slots"
                />
              )}
            />
            {errors?.slots?.type === "required" && (
              <Typography variant="span" color="red">
                Slots Is required.
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
                "Add"
              )}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddTest;
