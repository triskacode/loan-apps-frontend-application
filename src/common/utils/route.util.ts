import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AuthUtil } from "./auth.util";

export const withAuthRoute = (
  callback: GetServerSideProps
): GetServerSideProps => {
  return async (ctx: GetServerSidePropsContext) => {
    const accessToken = AuthUtil.getAccessToken(ctx);
    const unauthenticatedRedirectPath = AuthUtil.getUnauthenticatedRedirectPath(
      ctx.resolvedUrl
    );

    if (!accessToken) {
      return {
        redirect: {
          destination: unauthenticatedRedirectPath,
          permanent: false,
        },
      };
    }

    return await callback(ctx);
  };
};

export const onlyWithoutAuthRoute = (
  callback: GetServerSideProps
): GetServerSideProps => {
  return async (ctx: GetServerSidePropsContext) => {
    const accessToken = AuthUtil.getAccessToken(ctx);

    if (accessToken) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await callback(ctx);
  };
};
