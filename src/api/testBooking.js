import axiosSecure from "."


//create payment Intent


export const createPaymentIntent = async (price) => {
    const { data } = await axiosSecure.post('/')
}