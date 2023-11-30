import useAllTests from "../../../../hooks/useAllTests";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loader from "../../../../components/Loader";
import AllTestList from "../../../../components/Dashboard/AllTestList";
import { deleteTest } from "../../../../api/admin";
import toast from "react-hot-toast";
import WebTitle from "../../../../components/WebTitle/WebTitle";
import EmptyState from "../../../../components/Home/EmptyState";
const AllTests = () => {
  const { tests, isLoading, refetch } = useAllTests();

  if (isLoading) return <Loader />;
  const handleDelete = async (id) => {
    const res = await deleteTest(id);
    if (res.deletedCount > 0) {
      refetch();
      toast.success("Test Deleted Successfully");
    }
  };
  return (
    <>
      <WebTitle title={"All Test"} />
      {tests.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: "auto", overflowX: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Test Image</TableCell>
                <TableCell align="left">Test Title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Slots Left</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Reservation</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests?.map((test) => (
                <AllTestList
                  key={test._id}
                  test={test}
                  handleDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyState height={"50vh"} />
      )}
    </>
  );
};

export default AllTests;
