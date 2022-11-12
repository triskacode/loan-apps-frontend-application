import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { HttpErrorResponse } from "src/common/types";
import { Button } from "src/common/ui/button";
import { useDeleteLoan } from "src/modules/loan/use-case/use-delete-loan";

interface ActionLoanProps {
  loanId: number;
  isPending?: boolean;
}

export const ActionLoan: React.FC<ActionLoanProps> = ({
  loanId,
  isPending,
}) => {
  const { doDeleteLoan, requestState: deleteLoanRequestState } =
    useDeleteLoan(loanId);

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

  const handleSuccess = useCallback(() => {
    toast(`Loan has been ${isPending ? "canceled" : "deleted"}`, {
      icon: () => <span className="text-lg mb-0.5">👍</span>,
    });
  }, [isPending]);

  useEffect(() => {
    if (deleteLoanRequestState.isError)
      handleError(deleteLoanRequestState.error);
    else if (deleteLoanRequestState.isSuccess) handleSuccess();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteLoanRequestState.status]);

  return (
    <Button
      className="py-0.5"
      onClick={() => doDeleteLoan()}
      disabled={deleteLoanRequestState.isLoading}
    >
      {isPending ? "cancel" : "delete"}
    </Button>
  );
};
