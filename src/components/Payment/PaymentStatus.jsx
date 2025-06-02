import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { emptyOrder } from "../../redux/reducers/order";
import { useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Success! Payment received.");
          dispatch(emptyOrder());
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          {/* <CheckCircleIcon className="h-16 w-16 text-green-500" /> */}
        </div>
        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{message}</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully
          processed.
        </p>

        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={() => navigate("/profile/orders")}
            className="bg-green-400 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
