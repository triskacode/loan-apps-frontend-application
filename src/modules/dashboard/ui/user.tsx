import React, { useCallback, useEffect, useState } from "react";
import { BiMoney } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { HttpErrorResponse } from "src/common/types";
import { LoanState } from "src/common/types/loan.type";
import { Alert } from "src/common/ui/alert";
import { Select } from "src/common/ui/select";
import { Table } from "src/common/ui/table";
import { currencyIdr } from "src/common/utils";
import { useMyAccount } from "src/modules/account/use-case/use-my-account";
import { useMe } from "src/modules/auth/use-case/use-me";
import { FilterFindAllLoanDto } from "src/modules/loan/dto/find-all-loan.dto";
import { useMyLoan } from "src/modules/loan/use-case/use-my-loan";
import { Container } from "./partials/container";
import { ActionLoan } from "./partials/action-loan";
import { CreateLoan } from "./partials/create-loan";
import { CreatePayment } from "./partials/create-payment";

interface UserProps {}

export const User: React.FC<UserProps> = () => {
  const [dto, setDto] = useState<FilterFindAllLoanDto>({});
  const [errors, setErrors] = useState<string[] | null>(null);

  const { data: me, ...meRequestState } = useMe();
  const { data: myAccount, ...myAccountRequestState } = useMyAccount();
  const { data: loans, ...loansRequestState } = useMyLoan(dto);

  const handleChangeInputFilter = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const name = ev.target.name;
      const value = ev.target.value;
      if (value) setDto((prev) => ({ ...prev, [name]: value }));
      else
        setDto((prev) => {
          const dto = { ...prev };
          delete dto[name as "state"];
          return dto;
        });
    },
    []
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

  const handleHideError = useCallback(() => {
    setErrors(null);
  }, []);

  useEffect(() => {
    if (loansRequestState.isError) handleError(loansRequestState.error);
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loansRequestState.status]);

  useEffect(() => {
    if (meRequestState.isError) handleError(meRequestState.error);
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meRequestState.status]);

  useEffect(() => {
    if (myAccountRequestState.isError) handleError(myAccountRequestState.error);
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myAccountRequestState.status]);

  useEffect(() => {
    loansRequestState.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dto]);

  return (
    <Container>
      <div className="w-full grid grid-cols-[1fr_minmax(250px,30%)] gap-x-3 py-4 mb-5">
        <div className="flex flex-col justify-start min-h-[300px]">
          <h1 className="text-5xl my-5">
            <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Pinjaman
            </span>
            <span> apps</span>
          </h1>
        </div>
        <div className="group flex flex-col items-center rounded-md border boorder-slate-400/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="w-full flex-auto flex items-center justify-center text-white bg-gradient-to-r from-pink-500 to-violet-500 bg-[length:120%] bg-left group-hover:bg-right">
            <h1 className="text-3xl font-bold">
              {currencyIdr.format(myAccount?.loan_balance ?? 0)}
            </h1>
          </div>
          <div className="w-full flex flex-col items-center p-3">
            <div className="flex items-center gap-x-2 mb-4">
              <BiMoney className="text-lg mt-0.5" />
              <h2>Loans Balance</h2>
            </div>
            <CreatePayment account={myAccount} />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="py-4">
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <div className="py-1.5 px-1.5 border-none rounded-full shadow-none bg-slate-200/50 mr-2">
                <HiOutlineEye className="text-2xl" />
              </div>
              <h1 className="text-xl">History loan</h1>
            </div>
            <div className="flex gap-x-2">
              <Select
                className="w-1/3 min-w-[125px] py-1 shadow-sm"
                name="state"
                value={dto.state}
                required={true}
                onChange={handleChangeInputFilter}
              >
                <option value="">All state</option>
                {Object.values(LoanState).map((state, i) => (
                  <option key={i} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
              <CreateLoan />
            </div>
          </div>
          <hr className="w-full border-slate-400/50 mt-3" />
        </div>

        {errors && (
          <Alert>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}
        <Table>
          <thead>
            <tr>
              <th className="w-[50px] text-center">#</th>
              <th className="w-[350px]">email</th>
              <th className="w-[100px]">amount</th>
              <th className="w-[100px]">state</th>
              <th className="w-[100px]">action</th>
            </tr>
          </thead>
          <tbody>
            {loans && loans.length > 0 ? (
              loans.map((loan, i) => (
                <tr key={i}>
                  <td className="text-center">{++i}</td>
                  <td>{loan.user.email}</td>
                  <td className="text-center">
                    {currencyIdr.format(loan.amount ?? 0)}
                  </td>
                  <td className="text-center">{loan.state}</td>
                  <td className="text-center">
                    <ActionLoan
                      loanId={loan.id}
                      isPending={loan.state === LoanState.PENDING}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-slate-500">
                  Loan empty
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
