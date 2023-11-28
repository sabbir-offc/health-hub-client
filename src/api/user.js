import axiosSecure from "."

//cancel appointment
export const cancelAppointment = async (id) => {
    const { data } = await axiosSecure.delete(`/appointments/delete/${id}`);
    return data;
}