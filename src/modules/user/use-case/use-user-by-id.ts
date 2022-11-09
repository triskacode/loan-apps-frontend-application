import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { User } from "src/domain/user";
import { UserRepository } from "../repositories/user.repository";

export const useUserById = (id: number) => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.USER_FIND_BY_ID, id],
    queryFn: () => UserRepository.findById(id),
    onError: httpExceptionsHandler,
    select: (resp): User => resp.data,
  });

  return requestQuery;
};