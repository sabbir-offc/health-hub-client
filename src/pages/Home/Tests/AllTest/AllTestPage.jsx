import { Box, Button, Fade, Grid } from "@mui/material";
import useAllTests from "../../../../hooks/useAllTests";
import TestCard from "../../../../components/Home/Test/TestCard";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import EmptyState from "../../../../components/Home/EmptyState";
const AllTestPage = () => {
  const { tests, isLoading } = useAllTests();
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  if (isLoading) return <SkeletonLoading />;
  const futureTests = tests.filter((test) => {
    const testDate = new Date(test.date);
    return testDate >= currentDate;
  });

  const filteredTests = futureTests.filter((test) => {
    if (!selectedDate) {
      return true;
    }
    const testDate = new Date(test.date);
    return testDate.toDateString() === selectedDate.toDateString();
  });

  const handleDateChange = (selectedRange) => {
    setSelectedDate(selectedRange);
  };
  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleClearFilters = () => {
    setSelectedDate(null);
    setShowDatePicker(false);
  };

  return (
    <>
      <Box my={5}>
        <Button onClick={handleToggleDatePicker}>
          {showDatePicker ? "Hide" : "Filter By Date"}
        </Button>

        {showDatePicker && (
          <>
            <DayPicker selected={selectedDate} onDayClick={handleDateChange} />
            <Button onClick={handleClearFilters}>Clear Filters</Button>
          </>
        )}
      </Box>
      {filteredTests.length === 0 ? (
        <EmptyState height={"15vh"} />
      ) : (
        <Grid container gap={"16px"} my={"18px"}>
          {filteredTests.map((test) => (
            <TestCard test={test} key={test._id} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default AllTestPage;
