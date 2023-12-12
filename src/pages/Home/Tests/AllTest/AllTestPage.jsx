import { Box, Button, Grid } from "@mui/material";
import TestCard from "../../../../components/Home/Test/TestCard";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import EmptyState from "../../../../components/Home/EmptyState";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api";
const AllTestPage = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  // const { tests, isLoading } = useAllTests();
  const itemPerPage = 5;
  const { data: tests = [], isLoading } = useQuery({
    queryKey: ["allTestWIthPg", currentPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/tests?page=${currentPage}&size=${itemPerPage}`
      );
      return data;
    },
  });
  console.log(tests.count);

  if (isLoading) return <SkeletonLoading />;
  const futureTests = tests?.result.filter((test) => {
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

  const numberOfPages = Math.ceil(tests?.count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];
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

  const handleRight = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleLeft = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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
        <>
          <Grid
            container
            gap={"16px"}
            my={"18px"}
            sx={{ placeContent: "center" }}
          >
            {filteredTests.map((test) => (
              <TestCard test={test} key={test._id} />
            ))}
          </Grid>
          <Grid
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            my={4}
          >
            <Box display={"flex"} flexDirection={"row"} gap={2}>
              <Button onClick={handleLeft}>
                <KeyboardArrowLeftIcon />
              </Button>
              {pages.map((i, idx) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  sx={{ borderRadius: 50, display: "inline-block" }}
                  variant={currentPage === i ? "contained" : "outlined"}
                >
                  {" "}
                  {idx + 1}
                </Button>
              ))}
              <Button onClick={handleRight}>
                <ChevronRightIcon />
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
};

export default AllTestPage;
