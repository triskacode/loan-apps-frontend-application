import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { LoanRepository } from "../repositories/loan.repository";

export const useRejectLoan = (id: number) => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doRejectLoan, ...requestState } = useMutation({
    mutationFn: () => LoanRepository.reject(id),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.LOAN_RESOURCE],
      });
    },
  });

  return { doRejectLoan, requestState };
};
