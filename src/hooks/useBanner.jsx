import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./axiosPublic.js";

const useBanner = () => {
  const {
    data: banners,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/banners");
      return data;
    },
  });
  return { banners, isLoading, refetch };
};

export default useBanner;
