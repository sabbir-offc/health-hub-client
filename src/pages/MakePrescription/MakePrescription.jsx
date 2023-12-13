import { useState } from "react";
import axiosSecure from "../../api";
import useUserInfo from "../../hooks/useUserInfo";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { Download } from "@mui/icons-material";
const MakePrescription = () => {
  const [prescription, setPrescription] = useState(null);
  const { userInfo, isLoading } = useUserInfo();
  const [ill, setIll] = useState("");
  if (isLoading) return <Loader />;

  const ills = [
    "Fever",
    "Cold",
    "Flu (Influenza)",
    "Headache",
    "Allergies",
    "Gastrointestinal Issues",
    "Pain",
  ];
  const options = {
    method: "open",

    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },

    overrides: {
      pdf: {
        compress: true,
      },

      canvas: {
        useCORS: true,
      },
    },
  };
  const getTargetElement = () => document.getElementById("prescription");

  const generatePrescription = async (e) => {
    e.preventDefault();
    const patientName = userInfo?.name;
    const bloodGroup = userInfo?.blood;

    const medications = mapIllnessToMedications(ill);
    const patientData = {
      doctorName: "Dr. Alan Donald",
      patientName,
      medication: medications.join(", "),
      blood: bloodGroup,
      dosage: "1/2 per Day",
      email: userInfo?.email,
      ill,
    };
    try {
      const res = await axiosSecure.post("/generate", patientData);
      setPrescription(res?.data);
      console.log(prescription);
    } catch (error) {
      toast.error("Error generating prescription:", error);
    }
  };
  const mapIllnessToMedications = (selectedIllness) => {
    switch (selectedIllness) {
      case "Fever":
        return ["Napa Extra"];
      case "Cold":
        return ["Loratadine", "Cough suppressants"];
      case "Flu (Influenza)":
        return ["Oseltamivir"];
      case "Headache":
        return ["Advil"];
      case "Allergies":
        return ["Loratadine"];
      case "Gastrointestinal Issues":
        return ["Omeprazole"];
      case "Pain":
        return ["Naproxen"];
      default:
        return [];
    }
  };
  const todayDate = new Date();

  console.log(prescription, todayDate);
  return (
    <Box
      p={5}
      onSubmit={generatePrescription}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      component={"form"}
    >
      <Typography variant="h5" textAlign={"center"}>
        Generate Your E-Prescription
      </Typography>
      <Box>
        <TextField
          margin="normal"
          fullWidth
          name="name"
          value={userInfo?.name}
          label="Patient Name"
          type="text"
          id="name"
        />
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="blood">Blood Group</InputLabel>
          <Select
            labelId="blood"
            defaultValue={userInfo?.blood}
            label="Blood Group"
            readOnly
          >
            <MenuItem value={userInfo?.blood}>{userInfo?.blood}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel id="blood">Select Your Illness</InputLabel>
          <Select
            labelId="blood"
            fullWidth
            label="Select Your Illness"
            onChange={(e) => setIll(e.target.value)}
          >
            {ills.map((ill) => (
              <MenuItem key={ill} value={ill}>
                {ill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained">
          Generate Prescription
        </Button>
      </Box>

      {prescription && (
        <>
          <Box
            id="prescription"
            mt={5}
            border={"2px solid"}
            borderColor={"blue"}
            width={"60%"}
            p={5}
            textAlign={"center"}
            component={Paper}
          >
            <Typography variant="subtitle1" textAlign={"center"}>
              Generated Prescription:
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography>Doctor: {prescription?.doctorName}</Typography>
              <Typography>Date: {todayDate.toLocaleDateString()}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" textAlign={"left"}>
              Patient Name: {prescription?.patientName}{" "}
            </Typography>
            <Typography variant="subtitle1" textAlign={"left"}>
              Illness {prescription?.ill}{" "}
            </Typography>
            <Typography variant="subtitle1" textAlign={"left"}>
              Blood Group: {userInfo?.blood}{" "}
            </Typography>
            <Typography variant="subtitle1" textAlign={"left"}>
              Medication: {prescription?.medication}
            </Typography>
            <Typography variant="subtitle1" textAlign={"left"}>
              Dosage: {prescription?.dosage}
            </Typography>
            <Button
              onClick={() => generatePDF(getTargetElement, options)}
              variant="outlined"
              sx={{ mx: "auto", textAlign: "center", mt: 3 }}
            >
              Download Prescription <Download />
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MakePrescription;
