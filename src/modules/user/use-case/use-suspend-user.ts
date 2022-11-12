import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers";
import { appConfig } from "src/config/app.config";
import { UserRepository } from "../repositories/user.repository";

export const useSuspendUser = (id: number) => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doSuspendUser, ...requestState } = useMutation({
    mutationFn: () => UserRepository.suspend(id),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.USER_RESOURCE],
      });
    },
  });

  return { doSuspendUser, requestState };
};
