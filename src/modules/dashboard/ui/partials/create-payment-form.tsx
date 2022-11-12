import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HttpErrorResponse } from "src/common/types";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { Input } from "src/common/ui/input";
import { Account, PaymentIntens } from "src/domain/account";
import { CreatePaymentIntensDto } from "src/modules/account/dto/create-payment-intens.dto";
import { useCreatePayment } from "src/modules/account/use-case/use-create-payment";

interface CreatePaymentFormProps {
  account?: Account;
  successCallback?: (resp: PaymentIntens) => void;
}

export const CreatePaymentForm: React.FC<CreatePaymentFormProps> = ({
  account,
  successCallback,
}) => {
  const { doCreatePayment, requestState } = useCreatePayment();

  const initialDto: CreatePaymentIntensDto = useMemo(
    () => ({
      amount: 0,
    }),
    []
  );
  const [dto, setDto] = useState<CreatePaymentIntensDto>(initialDto);

  const [errors, setErrors] = useState<string[] | null>(null);

  const handleChangeInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const name = ev.target.name;
      const value = ev.target.value;

      setDto((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();

      doCreatePayment(dto);
    },
    [doCreatePayment, dto]
  );

  const handleError = useCallback((err: HttpErrorResponse) => {
    if (+err.code < 500 && err.errors) {
      if (typeof err.errors === "object") setErrors(Object.values(err.errors));
      else setErrors([err.errors]);
    } else if (+err.code < 500 && err.message) {
      setErrors([err.message]);
    } else {
      setErrors(["Whooops! Something went wrong"]);
    }
  }, []);

  const handleSuccess = useCallback(() => {
    if (requestState.data) successCallback?.(requestState.data.data);
  }, [requestState.data, successCallback]);

  const handleHideError = useCallback(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (requestState.isError) handleError(requestState.error);
    else if (requestState.isSuccess) handleSuccess();
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestState.status]);

  useEffect(() => {
    if (account && account.loan_balance)
      setDto({ amount: account.loan_balance });
  }, [account]);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {errors && (
        <Alert>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}

      <div className="w-full flex flex-col gap-y-1">
        <div>
          <label className="block mb-1 font-medium" htmlFor="input-amount">
            Amount
          </label>
          <Input
            className="py-2 w-full max-w-[250px]"
            id="input-amount"
            type="number"
            name="amount"
            autoComplete="amount"
            min={1}
            value={dto.amount}
            required={true}
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <div className="w-auto mt-5">
        <Button
          className="w-auto py-2 bg-blue-500 text-slate-50 hover:bg-blue-600 disabled:bg-blue-600/50"
          type="submit"
          disabled={requestState.isLoading}
        >
          Create payment
        </Button>
      </div>
    </form>
  );
};
