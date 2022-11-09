import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { appConfig } from "src/config/app.config";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserRepository } from "../repositories/user.repository";

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doUpdateUser, ...requestState } = useMutation({
    mutationFn: (dto: UpdateUserDto) => UserRepository.update(id, dto),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.USER_RESOURCE],
      });
    },
  });

  return { doUpdateUser, requestState };
};
