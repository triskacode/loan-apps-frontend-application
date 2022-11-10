import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { AuthUtil } from "src/common/utils";
import { withAuthRoute } from "src/common/utils/route.util";
import { appConfig } from "src/config/app.config";
import { AuthRepository } from "src/modules/auth/repositories/auth.repository";
import { User } from "src/modules/user";
import { UserRepository } from "src/modules/user/repositories/user.repository";

const Page: NextPage = () => {
  return <User />;
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    try {
      const queryClient = new QueryClient();
      const accessToken = AuthUtil.getAccessToken(ctx);

      await queryClient.fetchQuery([appConfig.cache.AUTH_ME], () =>
        AuthRepository.getMe(accessToken)
      );
      await queryClient.fetchQuery([appConfig.cache.USER_RESOURCE], () =>
        UserRepository.findAll({}, accessToken)
      );

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    } catch (err) {
      return { notFound: true };
    }
  }
);

export default Page;
