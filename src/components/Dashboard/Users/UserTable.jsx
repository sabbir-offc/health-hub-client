import { Avatar, Button, TableCell, TableRow } from "@mui/material";

import PropTypes from "prop-types";

const UserTable = ({
  user,
  handleBlock,
  loading,
  handleActive,
  handleMakeAdmin,
  handleMakeUser,
}) => {
  const { _id, name, email, status, role } = user;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="user">
        <Avatar src={user?.image} />
      </TableCell>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right" sx={{ textTransform: "uppercase" }}>
        {role === "admin" ? (
          <Button
            onClick={() => handleMakeUser(_id)}
            variant="outlined"
            color="error"
          >
            {loading ? "Updating..." : "Make User"}
          </Button>
        ) : (
          <Button
            onClick={() => handleMakeAdmin(_id)}
            variant="contained"
            color="success"
          >
            {loading ? "Updating" : "Make Admin"}
          </Button>
        )}
      </TableCell>
      <TableCell align="right" sx={{ textTransform: "uppercase" }}>
        {status}
      </TableCell>
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
  handleMakeUser: PropTypes.func,
  handleMakeAdmin: PropTypes.func,
  loading: PropTypes.bool,
};

export default UserTable;
