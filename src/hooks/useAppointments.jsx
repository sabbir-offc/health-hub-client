import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../api";

const useAppointments = () => {
  const { user } = useAuth();
  const {
    data: appointments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["appointments", user],
    queryFn: async () => {
      const { data } = await axiosSecure(`/appointments/${user?.email}`);
      console.log(data);
      return data;
    },
  });

  return { appointments, isLoading, refetch };
};

export default useAppointments;
