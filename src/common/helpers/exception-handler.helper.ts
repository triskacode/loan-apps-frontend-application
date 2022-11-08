import { useRouter } from "next/router";
import { useCallback } from "react";
import { HttpErrorResponse } from "../types/http-response.type";
import { useAccessToken } from "./auth.helper";

type THttpExceptionsHandler = (error: HttpErrorResponse) => void;
type TAppExceptionsHandler = (error: Error, ctx?: string) => void;

export const useExceptionsHandler = () => {
  const router = useRouter();
  const { destroyAccessToken } = useAccessToken();

  const httpExceptionsHandler: THttpExceptionsHandler = useCallback(
    (error) => {
      console.log(error);

      if (error?.code === 401) {
        destroyAccessToken();
        router.push("/");
      }
    },
    [destroyAccessToken, router]
  );

  const appExceptionsHandler: TAppExceptionsHandler = useCallback(
    (error, ctx) => {
      console.log(ctx, error);
    },
    []
  );

  return {
    httpExceptionsHandler,
    appExceptionsHandler,
  };
};
