import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, CardActions, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
} from "../../../api/admin";
import Loader from "../../../components/Loader";
import UserDialog from "../../../components/Dashboard/Users/UserDialog";
import { useState } from "react";
import toast from "react-hot-toast";
import WebTitle from "../../../components/WebTitle/WebTitle";

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
    try {
      setLoading(true);
      const res = await updateUserStatus(id, status);
      if (res.modifiedCount > 0) {
        refetch();
        toast.success("User is blocked.");
      }
    } catch (error) {
      toast.error("User Status Updating failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleActive = async (id) => {
    const status = "active";
    try {
      const res = await updateUserStatus(id, status);
      if (res.modifiedCount > 0) {
        refetch();
        toast.success("User is Active.");
      }
    } catch (error) {
      toast.error("User Status Update Failed.");
    }
  };
  const handleMakeAdmin = async (id) => {
    const role = "admin";
    try {
      setLoading(true);
      const res = await updateUserRole(id, role);
      if (res.modifiedCount > 0) {
        refetch();
        toast.success("Role Upgraded Successfully.");
      }
    } catch (error) {
      toast.error("Sorry something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const handleMakeUser = async (id) => {
    const role = "user";
    try {
      setLoading(true);
      const res = await updateUserRole(id, role);
      if (res.modifiedCount > 0) {
        refetch();
        toast.success("Now He/She is A User.");
      }
    } catch (error) {
      toast.error("Sorry something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <WebTitle title={"All Users"} />
      <Grid
        display={"flex"}
        flexWrap={"wrap"}
        gap={"6px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {users?.map((user) => (
          <Card key={user?._id} sx={{ minWidth: 200, padding: 2 }}>
            <CardActionArea sx={{ py: 2 }}>
              <Avatar
                src={user?.image}
                alt="green iguana"
                sx={{ width: "80px", height: "80px", mx: "auto" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <UserDialog
                handleBlock={handleBlock}
                handleActive={handleActive}
                user={user}
                loading={loading}
                handleMakeAdmin={handleMakeAdmin}
                handleMakeUser={handleMakeUser}
              />
            </CardActions>
          </Card>
        ))}
      </Grid>
    </>
  );
};
export default Users;
