import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useExceptionsHandler } from "src/common/helpers";
import { AuthUtil } from "src/common/utils";
import { AuthRepository } from "../repositories/auth.repository";

export const useLogin = () => {
  const router = useRouter();
  const redirectAfterLogin = useMemo(
    () =>
      (router.query.next && decodeURIComponent(router.query.next as string)) ??
      "/dashboard",
    [router.query.next]
  );

  const { httpExceptionsHandler } = useExceptionsHandler();
  const { mutate: doLogin, ...requestState } = useMutation({
    mutationFn: AuthRepository.login,
    onError: httpExceptionsHandler,
    onSuccess: (data) => {
      AuthUtil.storeAccessToken(data.data.accessToken);
      router.push(redirectAfterLogin);
    },
  });

  return { doLogin, requestState };
};
