import { GetServerSidePropsContext } from "next";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { appConfig } from "src/config/app.config";

export class AuthUtil {
  static getUnauthenticatedRedirectPath(currentPath: string) {
    return `/?next=${encodeURIComponent(currentPath)}`;
  }

  static getAccessToken(ctx?: GetServerSidePropsContext | null) {
    return getCookie(appConfig.auth.cookieKey, {
      req: ctx?.req,
      res: ctx?.res,
    }) as string;
  }

  static storeAccessToken(
    token: string,
    ctx?: GetServerSidePropsContext | null
  ) {
    return setCookie(appConfig.auth.cookieKey, token, {
      req: ctx?.req,
      res: ctx?.res,
    });
  }

  static destroyAccessToken(ctx?: GetServerSidePropsContext | null) {
    return deleteCookie(appConfig.auth.cookieKey, {
      req: ctx?.req,
      res: ctx?.res,
    });
  }
}
