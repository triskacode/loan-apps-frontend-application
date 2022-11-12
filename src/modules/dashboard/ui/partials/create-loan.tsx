import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiX } from "react-icons/hi";
import { toast } from "react-toastify";
import { HttpErrorResponse } from "src/common/types";
import { Alert } from "src/common/ui/alert";
import { Button } from "src/common/ui/button";
import { Input } from "src/common/ui/input";
import { Modal } from "src/common/ui/modal";
import { CreateLoanDto } from "src/modules/loan/dto/create-loan.dto";
import { useCreateLoan } from "../../../loan/use-case/use-create-loan";

interface CreateLoanProps {}

export const CreateLoan: React.FC<CreateLoanProps> = () => {
  const [showCreateLoan, setShowCreateLoan] = useState<boolean>(false);
  const { doCreateLoan, requestState } = useCreateLoan();

  const initialDto: CreateLoanDto = useMemo(
    () => ({
      amount: 0,
    }),
    []
  );
  const [dto, setDto] = useState<CreateLoanDto>(initialDto);

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

      doCreateLoan(dto);
    },
    [doCreateLoan, dto]
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
    setDto(initialDto);

    toast("Good, user has been created", {
      icon: () => <span className="text-lg mb-0.5">👍</span>,
    });
    setShowCreateLoan(false);
  }, [initialDto]);

  const handleHideError = useCallback(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (requestState.isError) handleError(requestState.error);
    else if (requestState.isSuccess) handleSuccess();
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestState.status]);

  return (
    <div>
      <Button
        className="py-1 px-3 border-green-600/50 bg-green-500 text-white hover:bg-green-600"
        onClick={() => setShowCreateLoan(true)}
      >
        Create new
      </Button>
      <Modal isOpen={showCreateLoan} handler={setShowCreateLoan}>
        <div className="w-full max-w-xl rounded-md border border-slate-400/50 bg-slate-50 p-5">
          <div className="mb-5">
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <h1 className="text-2xl font-medium">Create loan</h1>
              </div>
              <Button
                className="block w-auto py-2 px-2 border-none rounded-full shadow-none"
                onClick={() => setShowCreateLoan(false)}
              >
                <HiX className="text-2xl" />
              </Button>
            </div>
            <hr className="w-full border-slate-400/50 mt-2" />
          </div>
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
                <label
                  className="block mb-1 font-medium"
                  htmlFor="input-amount"
                >
                  Amount
                </label>
                <Input
                  className="py-2 w-full max-w-[250px]"
                  id="input-amount"
                  type="number"
                  name="amount"
                  autoComplete="amount"
                  min={0}
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
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
