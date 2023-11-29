import { useParams } from "react-router-dom";
import ReservationList from "../../../../components/Dashboard/Reservation/ReservationList";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import WebTitle from "../../../../components/WebTitle/WebTitle";
import Search from "../../../../components/Dashboard/Reservation/Search";
import { useState } from "react";
import Swal from "sweetalert2";
import { cancelAppointment } from "../../../../api/user";
import EmptyState from "../../../../components/Home/EmptyState";
import { useQuery } from "@tanstack/react-query";
import { getAllReservation } from "../../../../api/admin";
import Loader from "../../../../components/Loader";

const TestReservation = () => {
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();

  const {
    data: reservations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reservations", id, searchText],
    queryFn: async () => {
      const res = await getAllReservation(id, searchText);
      return res;
    },
  });

  if (isLoading) <Loader />;

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

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    setSearchText(searchText);
  };
  return (
    <>
      <WebTitle title={"Reservation"} />
      <Search handleSearch={handleSearch} />
      {reservations.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: "auto", overflowX: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Test Title</TableCell>
                <TableCell align="right">User Email</TableCell>
                <TableCell align="right">User Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Cancel </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations?.map((item) => (
                <ReservationList
                  key={item._id}
                  refetch={refetch}
                  item={item}
                  handleCancel={handleCancel}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState height={"60vh"} />
      )}
    </>
  );
};

export default TestReservation;
