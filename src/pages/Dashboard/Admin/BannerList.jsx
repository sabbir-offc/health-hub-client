import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useBanner from "../../../hooks/useBanner";
import { Avatar, Button } from "@mui/material";
import Loader from "../../../components/Loader";
import { deleteBanner, updateBannerStatus } from "../../../api/admin";
import toast from "react-hot-toast";
import { useState } from "react";
import WebTitle from "../../../components/WebTitle/WebTitle";
import Swal from "sweetalert2";
const BannerList = () => {
  const { banners, isLoading, refetch } = useBanner();
  const [loading, setLoading] = useState(false);
  if (isLoading) return <Loader />;

  const handleMakeEnable = async (id) => {
    const isActive = true;
    try {
      setLoading(true);
      const res = await updateBannerStatus(id, { isActive });
      if (res.modifiedCount > 0) {
        refetch();
        toast.success("Banener Active successfully");
      }
    } catch (error) {
      toast.error("Banner Active Failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleMakeDisable = async (id) => {
    const isActive = false;
    try {
      setLoading(true);
      const res = await updateBannerStatus(id, { isActive });
      if (res.modifiedCount > 0) {
        refetch();
        toast.success("Banener Disable successfully");
      }
    } catch (error) {
      toast.error("Banner Disabled failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBanner(id);
        if (res.deletedCount > 0) {
          refetch();
          return Swal.fire({
            title: "Deleted!",
            text: "Your Selected Banner has been cancelled.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <>
      <WebTitle title={"All Banner"} />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: "auto", overflowX: "auto" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Banner Image</TableCell>
              <TableCell align="left">Banner Title</TableCell>
              <TableCell align="right">Coupon Code</TableCell>
              <TableCell align="right">Discount Rate</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners?.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar src={row.image} sx={{ borderRadius: 2 }} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.coupon}</TableCell>
                <TableCell align="right">{row.discountRate}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleDelete(row._id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {row?.isActive === true ? (
                    <Button
                      onClick={() => handleMakeDisable(row._id)}
                      variant="outlined"
                      color="error"
                    >
                      {loading ? "Updating..." : "Make Disable"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleMakeEnable(row._id)}
                      variant="contained"
                      color="success"
                    >
                      {loading ? "Updating" : "Make Enable"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BannerList;
