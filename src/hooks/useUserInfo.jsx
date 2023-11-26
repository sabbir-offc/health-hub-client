import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../api";

const useUserInfo = () => {
  const { user, loading } = useAuth();
  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useQuery({
    // enabled: !loading && !!user?.email,
    queryKey: ["user", user],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data;
    },
  });

  return { userInfo, isLoading, refetch };
};

export default useUserInfo;
