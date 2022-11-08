import { useMutation } from "@tanstack/react-query";
import { useAccessToken } from "src/common/helpers/auth.helper";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { AuthRepository } from "../repository/auth.repository";

export const useLogin = () => {
  const { storeAccessToken } = useAccessToken();
  const { httpExceptionsHandler } = useExceptionsHandler();
  const { mutate: doLogin, ...requestState } = useMutation(
    AuthRepository.login,
    {
      onError: httpExceptionsHandler,
      onSuccess: (data) => {
        storeAccessToken(data.data.accessToken);
      },
    }
  );

  return {
    doLogin,
    requestState,
  };
};
