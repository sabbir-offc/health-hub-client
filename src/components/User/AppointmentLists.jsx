import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";

const AppointmentLists = ({ appointment, handleCancel }) => {
  const { title, date, _id } = appointment;
  console.log(date);

  const testDate = new Date(date);
  const modifiedDate = testDate.toLocaleDateString("en-GB");
  const formattedTime = testDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Dhaka",
  });
  console.log(formattedTime);
  return (
    <TableRow
      key={title}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell align="right">{modifiedDate}</TableCell>
      <TableCell align="right">{formattedTime}</TableCell>
      <TableCell align="right">
        <Button
          onClick={() => handleCancel(_id)}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

AppointmentLists.propTypes = {
  handleCancel: PropTypes.func,
  appointment: PropTypes.object,
};

export default AppointmentLists;
