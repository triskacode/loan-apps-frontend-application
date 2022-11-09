import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { UserRepository } from "../repositories/user.repository";

export const useRestoreUser = (id: number) => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doRestoreUser, ...requestState } = useMutation({
    mutationFn: () => UserRepository.restore(id),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.USER_RESOURCE],
      });
    },
  });

  return { doRestoreUser, requestState };
};
