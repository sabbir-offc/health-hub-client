import axiosSecure from "."


//create payment Intent


export const createPaymentIntent = async (price) => {
    const { data } = await axiosSecure.post('/create-payment-intent', price);
    return data;
}


//save appointment info in database
export const saveAppointmentInfo = async (appointmentInfo) => {
    const { data } = await axiosSecure.post('/appointments', appointmentInfo);
    return data;
}


//update slots and booking number

export const updateStatus = async (id) => {
    const { data } = await axiosSecure.patch(`/test/slots/${id}`,);
    return data;
}