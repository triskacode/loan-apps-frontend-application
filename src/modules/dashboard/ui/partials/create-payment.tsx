import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { HiX } from "react-icons/hi";
import { useAppContext } from "src/common/context";
import { Button } from "src/common/ui/button";
import { Modal } from "src/common/ui/modal";
import { Account, PaymentIntens } from "src/domain/account";
import { CreatePaymentForm } from "./create-payment-form";

interface CreatePaymentProps {
  account?: Account;
}

export const CreatePayment: React.FC<CreatePaymentProps> = ({ account }) => {
  const router = useRouter();
  const { setPaymentSecret } = useAppContext();
  const [showCreatePayment, setShowCreatePayment] = useState<boolean>(false);

  const handleSuccess = useCallback(
    (paymentIntents: PaymentIntens) => {
      setPaymentSecret?.(paymentIntents.client_secret);
      router.push("/dashboard/payment");
    },
    [router, setPaymentSecret]
  );

  return (
    <div className="w-full">
      <Button
        className="w-full py-1 px-3 border-none shadow-none"
        onClick={() => setShowCreatePayment(true)}
      >
        Pay now
      </Button>
      <Modal isOpen={showCreatePayment} handler={setShowCreatePayment}>
        <div className="w-full max-w-xl rounded-md border border-slate-400/50 bg-slate-50 p-5">
          <div className="mb-5">
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <h1 className="text-2xl font-medium">Payment</h1>
              </div>
              <Button
                className="block w-auto py-2 px-2 border-none rounded-full shadow-none"
                onClick={() => setShowCreatePayment(false)}
              >
                <HiX className="text-2xl" />
              </Button>
            </div>
            <hr className="w-full border-slate-400/50 mt-2" />
          </div>
          <CreatePaymentForm
            account={account}
            successCallback={handleSuccess}
          />
        </div>
      </Modal>
    </div>
  );
};
