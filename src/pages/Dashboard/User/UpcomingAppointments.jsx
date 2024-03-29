import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../../../components/Loader";
import WebTitle from "../../../components/WebTitle/WebTitle";
import AppointmentLists from "../../../components/User/AppointmentLists";
import useAppointments from "../../../hooks/useAppointments";
import { cancelAppointment } from "../../../api/user";
import Swal from "sweetalert2";
import EmptyState from "../../../components/Home/EmptyState";

const UpcomingAppointments = () => {
  const { appointments, isLoading, refetch } = useAppointments();

  if (isLoading) return <Loader />;

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel Appointment!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await cancelAppointment(id);
        if (res.deletedCount > 0) {
          refetch();
          return Swal.fire({
            title: "Cancelled!",
            text: "Your appointment has been cancelled.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <>
      <WebTitle title={"Upcoming Appointments"} />
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
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments
                .filter((appointment) => appointment?.status === "pending")
                .map((filteredAppointment) => (
                  <AppointmentLists
                    key={filteredAppointment._id}
                    appointment={filteredAppointment}
                    handleCancel={handleCancel}
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

export default UpcomingAppointments;
