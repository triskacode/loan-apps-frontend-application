import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { Loan } from "src/domain/loan";
import { LoanRepository } from "../repositories/loan.repository";

export const useMyLoan = () => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.LOAN_RESOURCE],
    queryFn: () => LoanRepository.findMyLoan(),
    onError: httpExceptionsHandler,
    select: (resp): Loan[] => resp.data,
  });

  return requestQuery;
};
