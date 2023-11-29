import { Button, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import StatusModal from "../../Modal/StatusModal";
import { useState } from "react";
import { updateReservationStatus } from "../../../api/admin";
import toast from "react-hot-toast";

const ReservationList = ({ handleCancel, item, refetch }) => {
  const { title, _id, status, user } = item;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const result = {
      testResult: e.target.result.value,
    };
    const res = await updateReservationStatus(id, result);
    if (res.matchedCount > 0) {
      refetch();
      toast.success("Test Result Delivered to the user.");
      setOpen(false);
    }
  };

  return (
    <TableRow
      key={title}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell align="right">{user?.email}</TableCell>
      <TableCell align="right">{user?.name}</TableCell>
      <TableCell align="right">
        <Button
          onClick={status === "pending" ? handleOpen : null}
          sx={{
            backgroundColor: status === "pending" ? "#FF9800" : "#00C853",
            color: "white",
            display: "inline-block",
            p: 1,
            borderRadius: "8px",
            "&:hover": {
              color: "black",
              bgcolor: "transparent",
            },
          }}
        >
          {status}
        </Button>
        <StatusModal
          handleSubmit={handleSubmit}
          open={open}
          _id={_id}
          setOpen={setOpen}
        />
      </TableCell>
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
ReservationList.propTypes = {
  item: PropTypes.object,
  handleCancel: PropTypes.func,
  refetch: PropTypes.func,
};
export default ReservationList;
