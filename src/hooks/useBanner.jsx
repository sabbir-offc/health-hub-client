import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";

const useBanner = () => {
  const {
    data: banners,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axiosPublic("/banners");
      return data;
    },
  });
  return { banners, isLoading, refetch };
};

export default useBanner;
