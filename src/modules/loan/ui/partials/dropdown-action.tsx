import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { HttpErrorResponse } from "src/common/types";
import { Dropdown } from "src/common/ui/dropdown";
import { useApproveLoan } from "../../use-case/use-approve-loan";
import { useRejectLoan } from "../../use-case/use-reject-loan";

interface DropdownActionProps {
  loanId: number;
  menu: ("approve" | "reject")[];
}

export const DropdownAction: React.FC<DropdownActionProps> = ({
  loanId,
  menu,
}) => {
  const { doApproveLoan, requestState: approveLoanRequestState } =
    useApproveLoan(loanId);
  const { doRejectLoan, requestState: rejectLoanRequestState } =
    useRejectLoan(loanId);

  const handleError = useCallback((err: HttpErrorResponse) => {
    if (+err.code < 500 && err.message) {
      toast.error(err.message, {
        icon: () => <span className="text-lg mb-0.5">😱</span>,
      });
    } else {
      toast.error("Whooops! Something went wrong", {
        icon: () => <span className="text-lg mb-0.5">💥</span>,
      });
    }
  }, []);

  const handleSuccess = useCallback((message: string) => {
    toast(message, {
      icon: () => <span className="text-lg mb-0.5">👍</span>,
    });
  }, []);

  useEffect(() => {
    if (approveLoanRequestState.isError)
      handleError(approveLoanRequestState.error);
    else if (approveLoanRequestState.isSuccess)
      handleSuccess("Loan has been approved");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveLoanRequestState.status]);

  useEffect(() => {
    if (rejectLoanRequestState.isError)
      handleError(rejectLoanRequestState.error);
    else if (rejectLoanRequestState.isSuccess)
      handleSuccess("Loan has been rejected");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rejectLoanRequestState.status]);

  return (
    <Dropdown name="action" position="br">
      <div className="min-w-[150px] w-auto py-1 rounded-md border border-slate-400/50 bg-slate-50 flex flex-col [&>*]:py-1 [&>*]:px-4 [&>*]:text-left hover:[&>*]:bg-slate-200 disabled:[&>*]:text-slate-500">
        {menu && menu.includes("approve") && (
          <button
            onClick={() => doApproveLoan()}
            disabled={approveLoanRequestState.isLoading}
          >
            Approve
          </button>
        )}
        {menu && menu.includes("reject") && (
          <button
            onClick={() => doRejectLoan()}
            disabled={rejectLoanRequestState.isLoading}
          >
            Reject
          </button>
        )}
      </div>
    </Dropdown>
  );
};
