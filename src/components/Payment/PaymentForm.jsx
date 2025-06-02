import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import Loader from "../Layout/Loader";
import ErrorPage from "../../pages/ErrorPage";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51QgSUHGRUb1UK0bH4z5xxJ2wdN1sSrklN02pD0J80Uz11O2pVAXisS173sYaB2VXLnZMQRD25w5OdVKUa90kRg3U00evALSqtp"
);

function PaymentForm() {
  const { userId, orderId, totalPrice, email, name } = useSelector(
    (store) => store.order
  );
  console.log("from payment form");
  console.log(totalPrice);
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPaymentProcess = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.post(
          "http://localhost:8000/api/payment-session/create-checkout-session",
          { orderId, userId, totalPrice, email, name }
        );
        console.log(response);
        const { client_secret } = response.data;
        setClientSecret(client_secret);
      } catch (err) {
        setIsError(true);
        toast.error("Error during fetch payment process");
        console.error("Error during fetch payment process:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentProcess();
  }, [email, userId, orderId, name, totalPrice]); // Empty dependency array ensures this runs only once

  const options = {
    clientSecret,
    appearance: {
      /* Customize appearance if needed */
    },
  };

  if (isLoading) {
    return (
      <div className="h-screen w-[80%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen w-[80%] flex items-center justify-center">
        {" "}
        <ErrorPage />
      </div>
    );
  }

  return (
    clientSecret && (
      <div className="min-h-screen w-[80%] mx-auto my-[2rem] bg-white p-4">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    )
  );
}

export default PaymentForm;
