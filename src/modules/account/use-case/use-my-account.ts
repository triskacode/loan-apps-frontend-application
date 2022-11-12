import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { Account } from "src/domain/account";
import { AccountRepository } from "../repositories/account.repository";

export const useMyAccount = () => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.ACCOUNT_RESOURCE, "my-account"],
    queryFn: () => AccountRepository.getMyAccount(),
    onError: httpExceptionsHandler,
    select: (resp): Account => resp.data,
  });

  return requestQuery;
};
