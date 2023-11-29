import { Box, Typography } from "@mui/material";
import { GoHourglass } from "react-icons/go";
const EmptyState = ({ height }) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={height}
      >
        <GoHourglass size={40} />
        <Typography textAlign={"center"} mt={2}>
          Sorry, No data available in this page.
        </Typography>
      </Box>
    </>
  );
};

export default EmptyState;
