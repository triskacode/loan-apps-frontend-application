import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers";
import { appConfig } from "src/config/app.config";
import { AccountStats } from "src/domain/account";
import { AccountRepository } from "../repositories/account.repository";

export const useStats = () => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.ACCOUNT_RESOURCE, "stats"],
    queryFn: () => AccountRepository.getStats(),
    onError: httpExceptionsHandler,
    select: (resp): AccountStats => resp.data,
  });

  return requestQuery;
};
