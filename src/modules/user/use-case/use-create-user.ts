import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { UserRepository } from "../repositories/user.repository";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doCreateUser, ...requestState } = useMutation({
    mutationFn: UserRepository.create,
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries([appConfig.cache.USER_FIND_ALL]);
    },
  });

  return {
    doCreateUser,
    requestState,
  };
};
