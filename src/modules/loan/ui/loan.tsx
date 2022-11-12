import React, { useCallback, useEffect, useState } from "react";
import { HttpErrorResponse } from "src/common/types";
import { LoanState } from "src/common/types/loan.type";
import { Alert } from "src/common/ui/alert";
import { Select } from "src/common/ui/select";
import { Table } from "src/common/ui/table";
import { currencyIdr } from "src/common/utils";
import { FilterFindAllLoanDto } from "../dto/find-all-loan.dto";
import { useAllLoan } from "../use-case/use-all-loan";
import { Container } from "./partials/container";
import { DropdownAction } from "./partials/dropdown-action";

interface LoanProps {}

export const Loan: React.FC<LoanProps> = () => {
  const [dto, setDto] = useState<FilterFindAllLoanDto>({});
  const [errors, setErrors] = useState<string[] | null>(null);

  const { data, ...requestState } = useAllLoan(dto);

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
    if (requestState.isError) handleError(requestState.error);
    else handleHideError();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestState.status]);

  useEffect(() => {
    requestState.refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dto]);

  return (
    <Container>
      <div className="py-4">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-medium">All loans</h1>
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
          {data && data.length > 0 ? (
            data.map((loan, i) => (
              <tr key={i}>
                <td className="text-center">{++i}</td>
                <td>{loan.user.email}</td>
                <td className="text-center">
                  {currencyIdr.format(loan.amount ?? 0)}
                </td>
                <td className="text-center">{loan.state}</td>
                <td className="text-center">
                  {loan.state === LoanState.PENDING ? (
                    <DropdownAction
                      loanId={loan.id}
                      menu={["approve", "reject"]}
                    />
                  ) : (
                    "-"
                  )}
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
    </Container>
  );
};
