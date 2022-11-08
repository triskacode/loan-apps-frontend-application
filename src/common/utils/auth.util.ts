import { NextPageContext } from "next";
import nookies from "nookies";
import { appConfig } from "src/config/app.config";

export class AuthUtil {
  static getUnauthenticatedRedirectPath(currentPath: string) {
    return `/?next=${encodeURIComponent(currentPath)}`;
  }

  static getAccessToken(
    ctx?:
      | Pick<NextPageContext, "req">
      | {
          req: Request;
        }
      | null
      | undefined
  ) {
    const cookie = nookies.get(ctx ?? null);

    return cookie[appConfig.auth.cookieName];
  }

  static storeAccessToken(
    token: string,
    ctx?: Pick<NextPageContext, "res"> | null | undefined
  ) {
    nookies.set(ctx ?? null, appConfig.auth.cookieName, token);
  }

  static destroyAccessToken(
    ctx?: Pick<NextPageContext, "res"> | null | undefined
  ) {
    nookies.destroy(ctx ?? null, appConfig.auth.cookieName);
  }
}
