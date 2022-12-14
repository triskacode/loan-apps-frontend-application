import React from "react";
import { LoanState } from "src/common/types";
import { Table } from "src/common/ui/table";
import { currencyUsd } from "src/common/utils";
import { Loan } from "src/domain/loan";
import { DropdownAction } from "src/modules/loan/ui/partials/dropdown-action";

interface ReviewLoanProps {
  loans?: Loan[];
}

export const ReviewLoan: React.FC<ReviewLoanProps> = ({ loans }) => {
  return (
    <Table className="[&_th]:py-2">
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
                {currencyUsd.format(loan.amount ?? 0)}
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
  );
};
