import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { usePaymentStatus } from "../use-case/use-payment-status";
import { Container } from "./partials/container";

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { type, message } = usePaymentStatus();

  useEffect(() => {
    if (type !== "loading") {
      toast(message, {
        icon: () => (
          <span className="text-lg mb-0.5">
            {type === "success" ? "👍" : type === "error" ? "💥" : "✌️"}
          </span>
        ),
      });

      if (type !== "retry") router.push("/dashboard");
    }
  }, [type, message, router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
        toast.error("Whooops! Something went wrong", {
          icon: () => <span className="text-lg mb-0.5">💥</span>,
        });
        return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://103.176.78.124:3000/dashboard/payment",
        },
      });

      if (error) {
        toast.error(
          error.type === "card_error" || error.type === "validation_error"
            ? error?.message ?? "Whooops! Something went wrong"
            : "Whooops! Something went wrong",
          {
            icon: () => <span className="text-lg mb-0.5">💥</span>,
          }
        );
      }

      setIsLoading(false);
    },
    [elements, stripe]
  );

  return (
    <Container>
      <div className="w-full max-w-xl rounded-md border border-slate-400/50 bg-slate-50 p-5 mx-auto">
        <div className="mb-5">
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <h1 className="text-2xl font-medium">Payment</h1>
            </div>
          </div>
          <hr className="w-full border-slate-400/50 mt-2" />
        </div>
        {type === "error" ? (
          <div>
            <Alert>
              <p>Something went wrong.</p>
            </Alert>
            <Link href="/dashboard">
              <Button className="w-full py-2 mt-3">Back to dashboard</Button>
            </Link>
          </div>
        ) : type === "success" ? (
          <div>
            <Alert className="border-green-500/50 bg-green-100 text-green-700">
              <p>Success! Payment received.</p>
            </Alert>
            <Link href="/dashboard">
              <Button className="w-full py-2 mt-3">Back to dashboard</Button>
            </Link>
          </div>
        ) : type === "info" ? (
          <div>
            <Alert className="border-blue-500/50 bg-blue-100 text-blue-700">
              <p>
                Payment processing. We&apos;ll update you when payment is
                received.
              </p>
            </Alert>
            <Link href="/dashboard">
              <Button className="w-full py-2 mt-3">Back to dashboard</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <PaymentElement />
            </div>
            <Button
              className="w-full py-2 mt-3"
              type="submit"
              disabled={isLoading || !stripe || !elements}
            >
              Pay now
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};
