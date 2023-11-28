import PropTypes from "prop-types";
import { Avatar, Button, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const AllTestList = ({ test, handleDelete }) => {
  const { title, image, price, slots, _id, date } = test;
  const testDate = new Date(date);
  const modifiedDate = testDate.toLocaleDateString("en-GB");
  return (
    <TableRow
      key={title}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Avatar src={image} sx={{ borderRadius: 2 }} />
      </TableCell>
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{slots}</TableCell>
      <TableCell align="right">{modifiedDate}</TableCell>
      <TableCell align="right">
        <Link
          to={`/dashboard/update-test/${_id}`}
          style={{ textTransform: "none" }}
        >
          <Button variant="contained">Update</Button>
        </Link>
      </TableCell>
      <TableCell align="right">
        <Button
          onClick={() => handleDelete(_id)}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
AllTestList.propTypes = {
  test: PropTypes.object,
  handleDelete: PropTypes.func,
};
export default AllTestList;
