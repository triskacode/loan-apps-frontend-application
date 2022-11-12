import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers";
import { appConfig } from "src/config/app.config";
import { UserRepository } from "../repositories/user.repository";

export const useActivateUser = (id: number) => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doActivateUser, ...requestState } = useMutation({
    mutationFn: () => UserRepository.activate(id),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.USER_RESOURCE],
      });
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.ACCOUNT_RESOURCE, "stats"],
      });
    },
  });

  return { doActivateUser, requestState };
};
