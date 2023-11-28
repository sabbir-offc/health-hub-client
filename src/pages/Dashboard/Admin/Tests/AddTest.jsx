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
import { imageUpload } from "../../../../api/imageUpload";
import { addTest } from "../../../../api/admin";
import { DayPicker } from "react-day-picker";
import useAuth from "../../../../hooks/useAuth";
import WebTitle from "../../../../components/WebTitle/WebTitle";
const AddTest = () => {
  const [imgBtnText, setImgBtnText] = useState("Upload Test Thumbnail Image");
  const [selectedImg, setSelectedImg] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelected] = useState(new Date());

  const { user } = useAuth();
  //hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const title = data.title;
    const details = data.details;
    const price = data.price;
    const slots = data.slots;
    try {
      setLoading(true);
      const { data } = await imageUpload(selectedImg);
      const testInfo = {
        title,
        image: data?.display_url,
        details,
        date: new Date(selectedDate),
        price: parseInt(price),
        slots: parseInt(slots),
        author: user?.displayName,
        authorImg: user?.photoURL,
      };

      const dbResponse = await addTest(testInfo);
      if (dbResponse.acknowledged) {
        toast.success("Test Added Successfully");
      }
    } catch (error) {
      toast.error(error.message);
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
    <>
      <WebTitle title={"Add Test"} />
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
                    <Typography
                      variant="h6"
                      color="red"
                      fontWeight={400}
                      fontSize={"16px"}
                    >
                      Slots Is required.
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DayPicker
                    {...field}
                    {...register("date")}
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelected}
                  />
                )}
              />

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
    </>
  );
};

export default AddTest;
