import { useQuery } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers";
import { appConfig } from "src/config/app.config";
import { User } from "src/domain/user";
import { AuthRepository } from "../repositories/auth.repository";

export const useMe = () => {
  const { httpExceptionsHandler } = useExceptionsHandler();

  const requestQuery = useQuery({
    queryKey: [appConfig.cache.AUTH_ME],
    queryFn: () => AuthRepository.getMe(),
    onError: httpExceptionsHandler,
    select: (resp): User => resp.data,
  });

  return requestQuery;
};
