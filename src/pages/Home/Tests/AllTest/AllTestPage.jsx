import { Grid } from "@mui/material";
import useAllTests from "../../../../hooks/useAllTests";
import TestCard from "../../../../components/Home/Test/TestCard";

const AllTestPage = () => {
  const { tests } = useAllTests();
  const currentDate = new Date();

  const futureTests = tests.filter((test) => {
    const testDate = new Date(test.date);
    return testDate >= currentDate;
  });
  return (
    <Grid container gap={"16px"} my={"18px"}>
      {futureTests.map((test) => (
        <TestCard test={test} key={test._id} />
      ))}
    </Grid>
  );
};

export default AllTestPage;
