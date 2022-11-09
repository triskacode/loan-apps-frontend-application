import { useRouter } from "next/router";
import { useCallback } from "react";
import { HttpErrorResponse } from "../types/http-response.type";
import { AuthUtil } from "../utils";

type THttpExceptionsHandler = (error: HttpErrorResponse) => void;
type TAppExceptionsHandler = (error: Error, ctx?: string) => void;

export const useExceptionsHandler = () => {
  const router = useRouter();

  const httpExceptionsHandler: THttpExceptionsHandler = useCallback(
    (error) => {
      if (error?.code === 401) {
        AuthUtil.destroyAccessToken();

        router.push("/");
      }
    },
    [router]
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
