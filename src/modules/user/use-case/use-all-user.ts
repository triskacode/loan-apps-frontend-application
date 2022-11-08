import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { UserRepository } from "../repositories/user.repository";

export const useAllUser = () => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery(
    [appConfig.cache.USER_FIND_ALL],
    () => UserRepository.findAll(),
    {
      onError: httpExceptionsHandler,
    }
  );

  return requestQuery;
};
