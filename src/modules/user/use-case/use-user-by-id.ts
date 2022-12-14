import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers";
import { appConfig } from "src/config/app.config";
import { User } from "src/domain/user";
import { UserRepository } from "../repositories/user.repository";

export const useUserById = (id: number) => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.USER_RESOURCE, +id],
    queryFn: () => UserRepository.findById(id),
    onError: httpExceptionsHandler,
    select: (resp): User => resp.data,
  });

  return requestQuery;
};
