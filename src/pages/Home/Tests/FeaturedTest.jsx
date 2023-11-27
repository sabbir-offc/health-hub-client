import { Grid } from "@mui/material";
import useAllTests from "../../../hooks/useAllTests";
import TestCard from "../../../components/Home/Test/TestCard";

const FeaturedTest = () => {
  const { tests } = useAllTests();
  return (
    <>
      <Grid container gap={"16px"} sx={{ placeContent: "center" }} my={"18px"}>
        {tests.map((test) => (
          <TestCard test={test} key={test._id} />
        ))}
      </Grid>
    </>
  );
};

export default FeaturedTest;
