import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useExceptionsHandler } from "src/common/helpers";
import { appConfig } from "src/config/app.config";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserRepository } from "../repositories/user.repository";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { httpExceptionsHandler } = useExceptionsHandler();

  const { mutate: doCreateUser, ...requestState } = useMutation({
    mutationFn: (dto: CreateUserDto) => UserRepository.create(dto),
    onError: httpExceptionsHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [appConfig.cache.USER_RESOURCE],
      });
    },
  });

  return { doCreateUser, requestState };
};
