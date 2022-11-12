import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "src/common/context";
import { UserRole } from "src/common/types";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { DashboardLayout } from "src/common/ui/layout";
import { AuthUtil, withAuthRoute } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { AuthRepository } from "src/modules/auth/repositories/auth.repository";
import { Payment } from "src/modules/dashboard";

const stripePromise = loadStripe(appConfig.payment.stripeKey!);

const Page: NextPage = () => {
  const router = useRouter();
  const clientSecret = router.query.payment_intent_client_secret as string;
  const { paymentSecret } = useAppContext();

  const [isTimeout, setIstimeout] = useState<boolean>(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (clientSecret || paymentSecret) {
      clearTimeout(timeout.current ?? undefined);
    } else {
      timeout.current = setTimeout(() => {
        setIstimeout(true);
      }, 2000);
    }
  }, [clientSecret, paymentSecret]);

  return !paymentSecret && !clientSecret ? (
    <DashboardLayout>
      <div className="w-full max-w-xl rounded-md border border-slate-400/50 bg-slate-50 p-5 mx-auto">
        <div className="mb-5">
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <h1 className="text-2xl font-medium">Payment</h1>
            </div>
          </div>
          <hr className="w-full border-slate-400/50 mt-2" />
        </div>
        {isTimeout && (
          <Alert>
            <p>Payment is not valid</p>
          </Alert>
        )}
        <Link href="/dashboard">
          <Button className="w-full py-2 mt-3">Back to dashboard</Button>
        </Link>
      </div>
    </DashboardLayout>
  ) : (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: paymentSecret ?? clientSecret }}
    >
      <Payment />
    </Elements>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    try {
      const queryClient = new QueryClient();
      const accessToken = AuthUtil.getAccessToken(ctx);

      const me = await queryClient.fetchQuery([appConfig.cache.AUTH_ME], () =>
        AuthRepository.getMe(accessToken)
      );
      if (me.data.role !== UserRole.USER) return { notFound: true };

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    } catch (err) {
      return { notFound: true };
    }
  }
);

export default Page;
