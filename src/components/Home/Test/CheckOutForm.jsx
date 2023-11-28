import PropTypes from "prop-types";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "../../../checkoutForm.css";
import useAuth from "../../../hooks/useAuth";
import { ImSpinner5 } from "react-icons/im";
import { Box, Button, Grid } from "@mui/material";
import {
  createPaymentIntent,
  saveAppointmentInfo,
  updateStatus,
} from "../../../api/testBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ appointmentInfo, closeModal, discountRate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Create Payment Intent
  useEffect(() => {
    if (discountRate > 0) {
      createPaymentIntent({ price: discountRate }).then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      });
    }
  }, [discountRate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
    }

    console.log("payment intent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      // save payment information to the server
      // Update room status in db
      const paymentInfo = {
        ...appointmentInfo,
        transactionId: paymentIntent.id,
      };
      try {
        await saveAppointmentInfo(paymentInfo);
        await updateStatus(appointmentInfo?.testId);
        toast.success(
          `Appointment booking successfully! TR: ${paymentIntent?.id}`
        );
        navigate("/dashboard/my-appointments");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <>
      <Box component={"form"} m={"5px"} onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Grid display={"flex"} justifyContent={"space-around"} my={"5px"}>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!stripe || !clientSecret || processing}
          >
            {processing ? (
              <ImSpinner5
                id="spin"
                style={{ animation: "spin 1s linear infinite" }}
                size={23}
              />
            ) : (
              `Pay ${discountRate || ""}$`
            )}
          </Button>
        </Grid>
      </Box>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

CheckoutForm.propTypes = {
  appointmentInfo: PropTypes.object,
  closeModal: PropTypes.func,
  discountRate: PropTypes.number,
};
export default CheckoutForm;
