import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";

const SkeletonLoading = () => {
  const data = [1, 2, 3, 4, 5, 6, 7];
  return (
    <Grid container gap={"16px"}>
      {data.map((n) => (
        <Grid item key={n}>
          <Skeleton variant="rectangular" width={230} height={140} />
          <Box sx={{ pt: 0.5 }}>
            <Typography component="div" variant={"h4"}>
              <Skeleton />
            </Typography>
            <Skeleton />
            <Skeleton width="70%" />
            <Skeleton width="50%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
export default SkeletonLoading;
