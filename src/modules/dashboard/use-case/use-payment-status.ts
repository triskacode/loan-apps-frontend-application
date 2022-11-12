import { useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export const usePaymentStatus = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<
    "loading" | "success" | "info" | "error" | "retry"
  >("loading");

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (stripe && clientSecret) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            setType("success");
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            setType("info");
            break;

          case "requires_payment_method":
            setMessage("Payment failed. Please try another payment method.");
            setType("retry");
            break;

          default:
            setMessage("Something went wrong.");
            setType("error");
            break;
        }
      });
    }
  }, [stripe]);

  return { message, type };
};
