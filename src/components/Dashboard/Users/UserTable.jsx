import { Avatar, Button, TableCell, TableRow } from "@mui/material";

import PropTypes from "prop-types";

const UserTable = ({ user, handleBlock, loading, handleActive }) => {
  const { _id, name, email, status, role } = user;
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="user">
        {/* <Avatar src={user.image} sx={{ borderRadius: 2 }} /> */}
      </TableCell>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right">{role}</TableCell>
      <TableCell align="right">{status}</TableCell>
      <TableCell align="right">
        {status === "active" ? (
          <Button
            onClick={() => handleBlock(_id)}
            variant="outlined"
            color="error"
          >
            {loading ? "Updating..." : "Block user"}
          </Button>
        ) : (
          <Button
            onClick={() => handleActive(_id)}
            variant="contained"
            color="success"
          >
            {loading ? "Updating" : "Active User"}
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

UserTable.propTypes = {
  user: PropTypes.object,
  handleBlock: PropTypes.func,
  handleActive: PropTypes.func,
  loading: PropTypes.bool,
};

export default UserTable;
