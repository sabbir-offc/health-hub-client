import { Grid } from "@mui/material";
import useAllTests from "../../../hooks/useAllTests";
import TestCard from "../../../components/Home/Test/TestCard";
import SkeletonLoading from "../../../components/SkeletonLoading";

const FeaturedTest = () => {
  const { tests, isLoading } = useAllTests({ sortField: "desc" });
  if (isLoading) return <SkeletonLoading />;
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
