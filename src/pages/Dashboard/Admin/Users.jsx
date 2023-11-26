import { useQuery } from "@tanstack/react-query";
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
} from "../../../api/admin";

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
import { useState } from "react";
import UserTable from "../../../components/Dashboard/Users/UserTable";
import toast from "react-hot-toast";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await getAllUsers();
      return res;
    },
  });

  if (isLoading) return <Loader />;
  const handleBlock = async (id) => {
    const status = "blocked";
    const res = await updateUserStatus(id, status);
    if (res.modifiedCount > 0) {
      refetch();
      toast.success("User is blocked.");
    }
  };
  const handleActive = async (id) => {
    const status = "active";
    const res = await updateUserStatus(id, status);
    if (res.modifiedCount > 0) {
      refetch();
      toast.success("User is Active.");
    }
  };

  const handleMakeAdmin = async (id) => {
    const role = "admin";
    const res = await updateUserRole(id, role);
    if (res.modifiedCount > 0) {
      refetch();
      toast.success("Role Upgraded Successfully.");
    }
  };
  const handleMakeUser = async (id) => {
    const role = "user";
    const res = await updateUserRole(id, role);
    if (res.modifiedCount > 0) {
      refetch();
      toast.success("Now He/She is A User.");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Image</TableCell>
            <TableCell align="left">User Name</TableCell>
            <TableCell align="right">User Email</TableCell>
            <TableCell align="right">User Role</TableCell>
            <TableCell align="right">User Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <UserTable
              loading={loading}
              user={user}
              handleBlock={handleBlock}
              key={user._id}
              handleActive={handleActive}
              handleMakeAdmin={handleMakeAdmin}
              handleMakeUser={handleMakeUser}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
