import { Box, Grid } from "@mui/material";
import SyncLoader from "react-spinners/SyncLoader";
const Loader = () => {
  return (
    <Grid
      container
      minHeight="100vh"
      minWidth={"full"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SyncLoader color="#1565C0" />
    </Grid>
  );
};

export default Loader;
