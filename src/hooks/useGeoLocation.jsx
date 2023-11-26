import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api";

const useGeoLocation = () => {
  const { data: location, isLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const { data } = await axiosSecure("/location");
      return data;
    },
  });
  return { location, isLoading };
};

export default useGeoLocation;
