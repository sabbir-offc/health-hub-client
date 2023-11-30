import { useQuery } from "@tanstack/react-query";
import { getAllTests } from "../api/admin";

const useAllTests = ({ sortField } = {}) => {
  const {
    data: tests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      if (sortField) {
        const res = await getAllTests(sortField);
        return res.result;
      } else {
        const res = await getAllTests();
        return res.result;
      }
    },
  });
  return { tests, refetch, isLoading };
};

export default useAllTests;
