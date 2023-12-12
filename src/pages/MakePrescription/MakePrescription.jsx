import { useState } from "react";
import axiosSecure from "../../api";
import useUserInfo from "../../hooks/useUserInfo";
import { Box, Button, Paper, Typography } from "@mui/material";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
const MakePrescription = () => {
  const [patientData, setPatientData] = useState({});
  const [prescription, setPrescription] = useState(null);

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

  const generatePrescription = async () => {
    try {
      const response = await axiosSecure.post("/generate", patientData);
      setPrescription(response.data.prescription);
      setPatientData(response.data.prescription);
    } catch (error) {
      console.error("Error generating prescription:", error);
    }
  };
  const { userInfo } = useUserInfo();
  return (
    <Box p={5} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography variant="h5" textAlign={"center"}>
        Generate Your E-Prescription
      </Typography>
      <Button variant="contained" onClick={generatePrescription}>
        Generate Prescription
      </Button>

      {prescription && (
        <>
          <Box
            id="prescription"
            mt={5}
            border={"2px solid"}
            borderColor={"blue"}
            p={5}
            component={Paper}
          >
            <Typography variant="subtitle1" textAlign={"center"}>
              Generated Prescription:
            </Typography>
            <p>Doctor: Dr. Sabbir Howlader</p>
            <p>Medicine: Napa Extra</p>
            <p>Patient Name: {userInfo?.name} </p>
            <p>Blood Group: {userInfo?.blood} </p>
            <p>Dosage: 1/2 per day</p>
            <Button
              onClick={() => generatePDF(getTargetElement, options)}
              variant="outlined"
            >
              Download Prescription
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MakePrescription;
