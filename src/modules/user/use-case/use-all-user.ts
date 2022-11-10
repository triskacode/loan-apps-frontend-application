import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { User } from "src/domain/user";
import { FilterFindAllDto } from "../dto/find-all-user.dto";
import { UserRepository } from "../repositories/user.repository";

export const useAllUser = (filter?: FilterFindAllDto) => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.USER_RESOURCE],
    queryFn: () => UserRepository.findAll(filter),
    onError: httpExceptionsHandler,
    select: (resp): User[] => resp.data,
  });

  return requestQuery;
};
