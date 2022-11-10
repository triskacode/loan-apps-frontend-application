import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { Loan } from "src/domain/loan";
import { FilterFindAllLoanDto } from "../dto/find-all-loan.dto";
import { LoanRepository } from "../repositories/loan.repository";

export const useAllLoan = (filter?: FilterFindAllLoanDto) => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.LOAN_RESOURCE],
    queryFn: () => LoanRepository.findAll(filter),
    onError: httpExceptionsHandler,
    select: (resp): Loan[] => resp.data,
  });

  return requestQuery;
};
