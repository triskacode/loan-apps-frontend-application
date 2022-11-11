import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { LoanRepository } from "../repositories/loan.repository";

export const useApproveLoan = (id: number) => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doApproveLoan, ...requestState } = useMutation({
    mutationFn: () => LoanRepository.approve(id),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.LOAN_RESOURCE],
      });
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.ACCOUNT_RESOURCE, "stats"],
      });
    },
  });

  return { doApproveLoan, requestState };
};
