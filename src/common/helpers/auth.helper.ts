import { NextPageContext } from "next";
import { useCallback, useMemo } from "react";
import { AuthUtil } from "../utils";

export const useAccessToken = () => {
  const accessToken = useMemo(() => AuthUtil.getAccessToken(), []);

  const storeAccessToken = useCallback(
    (token: string, ctx?: Pick<NextPageContext, "res"> | null | undefined) =>
      AuthUtil.storeAccessToken(token, ctx),
    []
  );

  const destroyAccessToken = useCallback(
    (ctx?: Pick<NextPageContext, "res"> | null | undefined) =>
      AuthUtil.destroyAccessToken(ctx),
    []
  );

  return {
    accessToken,
    storeAccessToken,
    destroyAccessToken,
  };
};
