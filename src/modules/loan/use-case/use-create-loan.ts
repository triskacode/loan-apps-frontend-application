import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { CreateLoanDto } from "../dto/create-loan.dto";
import { LoanRepository } from "../repositories/loan.repository";

export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doCreateLoan, ...requestState } = useMutation({
    mutationFn: (dto: CreateLoanDto) => LoanRepository.create(dto),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.LOAN_RESOURCE],
      });
    },
  });

  return { doCreateLoan, requestState };
};
