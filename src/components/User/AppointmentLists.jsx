import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import ResultModal from "../Modal/ResultModal";

const AppointmentLists = ({
  appointment,
  handleCancel,
  handleOpen,
  setOpen,
  open,
}) => {
  const { title, date, _id, status } = appointment;
  const location = useLocation();

  const testDate = new Date(date);
  const modifiedDate = testDate.toLocaleDateString("en-GB");

  const formattedTime = testDate.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });
  return (
    <TableRow
      key={title}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell align="right">{modifiedDate}</TableCell>
      {location.pathname === "/dashboard/my-appointments" ? (
        <TableCell align="right" sx={{ textTransform: "uppercase" }}>
          {formattedTime}
        </TableCell>
      ) : (
        <TableCell
          align="right"
          sx={{ textTransform: "uppercase", color: "green" }}
        >
          {status}
        </TableCell>
      )}
      <TableCell align="right">
        {location.pathname === "/dashboard/my-appointments" ? (
          <Button
            onClick={() => handleCancel(_id)}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        ) : (
          <Button onClick={handleOpen} variant="outlined" color="error">
            See Result
          </Button>
        )}
      </TableCell>
      <ResultModal
        result={appointment?.testResult}
        setOpen={setOpen}
        open={open}
      />
    </TableRow>
  );
};

AppointmentLists.propTypes = {
  handleCancel: PropTypes.func,
  handleOpen: PropTypes.func,
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  appointment: PropTypes.object,
};

export default AppointmentLists;
