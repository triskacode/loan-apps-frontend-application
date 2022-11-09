import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { AuthUtil } from "src/common/utils";
import { withAuthRoute } from "src/common/utils/route.util";
import { appConfig } from "src/config/app.config";
import { UpdateUser } from "src/modules/user";
import { UserRepository } from "src/modules/user/repositories/user.repository";

const Page: NextPage = () => {
  return <UpdateUser />;
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    try {
      const id = ctx.params?.id as string;
      if (!id || isNaN(+id)) {
        return { notFound: true };
      }

      const queryClient = new QueryClient();
      const accessToken = AuthUtil.getAccessToken(ctx);

      await queryClient.fetchQuery(
        [appConfig.cache.USER_RESOURCE, { id }],
        () => UserRepository.findById(+id, accessToken)
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
