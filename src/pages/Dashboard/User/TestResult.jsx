import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AppointmentLists from "../../../components/User/AppointmentLists";
import EmptyState from "../../../components/Home/EmptyState";
import WebTitle from "../../../components/WebTitle/WebTitle";
import Loader from "../../../components/Loader";
import useAppointments from "../../../hooks/useAppointments";
import { useState } from "react";
import { Download } from "@mui/icons-material";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
const TestResult = () => {
  const [open, setOpen] = useState(false);
  const { appointments, isLoading } = useAppointments();
  if (isLoading) return <Loader />;
  const handleOpen = () => setOpen(true);

  const options = {
    method: "open",

    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
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
  const getTargetElement = () => document.getElementById("test-result");
  return (
    <>
      <WebTitle title={"Test Result"} />
      {appointments.length > 0 ? (
        <>
          <Button
            onClick={() => generatePDF(getTargetElement, options)}
            variant="contained"
            sx={{ mb: 2 }}
          >
            Download PDF <Download />
          </Button>
          <TableContainer id="test-result" component={Paper}>
            <Table
              sx={{ minWidth: "auto", overflowX: "auto" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Test Name</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments
                  ?.filter((appointment) => appointment.status === "delivered")
                  .map((filteredAppointment) => (
                    <AppointmentLists
                      key={filteredAppointment._id}
                      appointment={filteredAppointment}
                      handleOpen={handleOpen}
                      open={open}
                      setOpen={setOpen}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <EmptyState height={"80vh"} />
      )}
    </>
  );
};

export default TestResult;
