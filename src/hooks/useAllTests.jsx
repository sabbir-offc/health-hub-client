import { useQuery } from "@tanstack/react-query";
import { getAllTests } from "../api/admin";

const useAllTests = () => {
  const {
    data: tests,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allTests"],
    queryFn: async () => {
      const res = await getAllTests();
      return res;
    },
  });
  return { tests, refetch, isLoading };
};

export default useAllTests;
