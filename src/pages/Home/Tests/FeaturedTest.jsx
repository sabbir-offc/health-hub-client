import { Grid } from "@mui/material";
import useAllTests from "../../../hooks/useAllTests";
import TestCard from "../../../components/Home/Test/TestCard";

const FeaturedTest = () => {
  const { tests } = useAllTests({ sortField: "desc" });

  return (
    <>
      <Grid container gap={"16px"} my={"18px"}>
        {tests.slice(0, 3).map((test) => (
          <TestCard test={test} key={test._id} />
        ))}
      </Grid>
    </>
  );
};

export default FeaturedTest;
