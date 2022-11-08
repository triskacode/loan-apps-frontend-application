import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useAccessToken } from "src/common/helpers/auth.helper";
import { useExceptionsHandler } from "src/common/helpers/exception-handler.helper";
import { AuthRepository } from "../repositories/auth.repository";

export const useLogin = () => {
  const router = useRouter();
  const redirectAfterLogin = useMemo(
    () =>
      (router.query.next && decodeURIComponent(router.query.next as string)) ??
      "/dashboard",
    [router.query.next]
  );

  const { storeAccessToken } = useAccessToken();
  const { httpExceptionsHandler } = useExceptionsHandler();
  const { mutate: doLogin, ...requestState } = useMutation(
    AuthRepository.login,
    {
      onError: httpExceptionsHandler,
      onSuccess: (data) => {
        storeAccessToken(data.data.accessToken);

        router.push(redirectAfterLogin);
      },
    }
  );

  return {
    doLogin,
    requestState,
  };
};
