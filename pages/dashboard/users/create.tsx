import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { UserRole } from "src/common/types";
import { AuthUtil, withAuthRoute } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { AuthRepository } from "src/modules/auth/repositories/auth.repository";
import { CreateUser } from "src/modules/user";

const Page: NextPage = () => {
  return <CreateUser />;
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    try {
      const queryClient = new QueryClient();
      const accessToken = AuthUtil.getAccessToken(ctx);

      const me = await queryClient.fetchQuery([appConfig.cache.AUTH_ME], () =>
        AuthRepository.getMe(accessToken)
      );
      if (me.data.role !== UserRole.MANAGER) return { notFound: true };

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
