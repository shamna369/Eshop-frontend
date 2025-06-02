import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentStatus from "./PaymentStatus";

const stripePromise = loadStripe(
  "pk_test_51QgSUHGRUb1UK0bH4z5xxJ2wdN1sSrklN02pD0J80Uz11O2pVAXisS173sYaB2VXLnZMQRD25w5OdVKUa90kRg3U00evALSqtp"
);

function PaymentSuccessPage() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  const options = {
    clientSecret,
    appearance: {
      /* Customize appearance if needed */
    },
  };

  return (
    <div className="">
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentStatus />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PaymentSuccessPage;
