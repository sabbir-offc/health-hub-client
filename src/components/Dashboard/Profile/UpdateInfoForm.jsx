import PropTypes from "prop-types";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

import Loader from "../../Loader";
import useGeoLocation from "../../../hooks/useGeoLocation";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/imageUpload";
import { updateUserInfo } from "../../../api/auth";
import { ImSpinner5 } from "react-icons/im";
import useUserInfo from "../../../hooks/useUserInfo";
import toast from "react-hot-toast";

const UpdateInfoForm = ({ setShow }) => {
  const { updateUserProfile } = useAuth();
  const [district, setDistrict] = useState("Dhaka");
  const [upazilla, setUpazilla] = useState("Savar");
  const [blood, setBlood] = useState("A+");
  const [selectedImg, setSelectedImg] = useState(undefined);
  const [imgBtnText, setImgBtnText] = useState("Upload Your Image");
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const { location, isLoading } = useGeoLocation();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm();
  const { userInfo, refetch } = useUserInfo();

  if (isLoading) return <Loader />;

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

  const onSubmit = async (data) => {
    const name = data.name;

    try {
      setLoading(true);
      let imageUrl;

      if (selectedImg) {
        const { data } = await imageUpload(selectedImg);
        imageUrl = data?.display_url;
      } else {
        imageUrl = userInfo?.image;
      }

      //update user name and image
      await updateUserProfile(name, imageUrl);

      //update user info in database
      const updatedInfo = {
        name,
        blood,
        district,
        upazilla,
      };
      const dbResponse = await updateUserInfo(updatedInfo, userInfo?._id);
      if (dbResponse.modifiedCount > 0) {
        refetch();
        toast.success("User Profile updated successfully");
        return setShow(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <Controller
        name="name"
        control={control}
        defaultValue={userInfo?.name}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            defaultValue={userInfo?.name}
            id="name"
            label="Your Name"
            name="name"
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
        defaultValue={userInfo?.blood}
        render={({ field }) => (
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="blood">Blood Groups</InputLabel>
            <Select
              {...field}
              labelId="blood"
              label="Blood Groups"
              defaultValue={userInfo?.blood}
              onChange={(e) => {
                setBlood(e.target.value);
                field.onChange(e);
              }}
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
        defaultValue={userInfo?.district}
        render={({ field }) => (
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="district">Districts</InputLabel>
            <Select
              {...field}
              labelId="district"
              label="Districts"
              defaultValue={userInfo?.district}
              onChange={(e) => {
                setDistrict(e.target.value);
                field.onChange(e);
              }}
            >
              {location?.districts?.map((district) => (
                <MenuItem key={district._id} value={district.name}>
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
        defaultValue={userInfo?.upazilla}
        render={({ field }) => (
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="upazilla">Upazilla</InputLabel>
            <Select
              {...field}
              labelId="upazilla"
              label="Upazilla"
              defaultValue={userInfo?.upazilla}
              onChange={(e) => {
                setUpazilla(e.target.value);
                field.onChange(e);
              }}
            >
              {location?.upazillas?.map((upazilla) => (
                <MenuItem key={upazilla._id} value={upazilla.name}>
                  {upazilla.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {loading ? (
          <ImSpinner5
            id="spin"
            style={{ animation: "spin 1s linear infinite" }}
            size={23}
          />
        ) : (
          "Update"
        )}
      </Button>
    </Box>
  );
};

UpdateInfoForm.propTypes = {
  setShow: PropTypes.func,
};
export default UpdateInfoForm;
