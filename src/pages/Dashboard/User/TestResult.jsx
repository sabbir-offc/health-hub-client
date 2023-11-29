import {
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

const TestResult = () => {
  const [open, setOpen] = useState(false);
  const { appointments, isLoading } = useAppointments();
  if (isLoading) return <Loader />;
  const handleOpen = () => setOpen(true);
  return (
    <>
      <WebTitle title={"Test Result"} />
      {appointments.length > 0 ? (
        <TableContainer component={Paper}>
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
      ) : (
        <EmptyState height={"80vh"} />
      )}
    </>
  );
};

export default TestResult;
