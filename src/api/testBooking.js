import axiosSecure from "."


//create payment Intent


export const createPaymentIntent = async (price) => {
    const { data } = await axiosSecure.post('/create-payment-intent', price);
    return data;
}


//save appoinment info in database
export const saveAppoinment = async () => {

}
