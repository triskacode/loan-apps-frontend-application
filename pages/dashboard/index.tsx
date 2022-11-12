import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { UserRole, UserState } from "src/common/types";
import { LoanState } from "src/common/types/loan.type";
import { AuthUtil } from "src/common/utils";
import { withAuthRoute } from "src/common/utils/route.util";
import { appConfig } from "src/config/app.config";
import { AccountRepository } from "src/modules/account/repositories/account.repository";
import { AuthRepository } from "src/modules/auth/repositories/auth.repository";
import { Dashboard } from "src/modules/dashboard";
import { LoanRepository } from "src/modules/loan/repositories/loan.repository";
import { UserRepository } from "src/modules/user/repositories/user.repository";

const Page: NextPage = () => {
  return <Dashboard />;
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    try {
      const queryClient = new QueryClient();
      const accessToken = AuthUtil.getAccessToken(ctx);

      const me = await queryClient.fetchQuery([appConfig.cache.AUTH_ME], () =>
        AuthRepository.getMe(accessToken)
      );

      if (me.data.role === UserRole.MANAGER) {
        await queryClient.fetchQuery(
          [appConfig.cache.ACCOUNT_RESOURCE, "stats"],
          () => AccountRepository.getStats(accessToken)
        );

        await queryClient.fetchQuery([appConfig.cache.USER_RESOURCE], () =>
          UserRepository.findAll({ state: UserState.CREATED }, accessToken)
        );

        await queryClient.fetchQuery([appConfig.cache.LOAN_RESOURCE], () =>
          LoanRepository.findAll({ state: LoanState.PENDING }, accessToken)
        );
      } else {
        await queryClient.fetchQuery(
          [appConfig.cache.ACCOUNT_RESOURCE, "my-account"],
          () => AccountRepository.getMyAccount(accessToken)
        );

        await queryClient.fetchQuery(
          [appConfig.cache.LOAN_RESOURCE, "my-loan"],
          () => LoanRepository.findMyLoan({}, accessToken)
        );
      }

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
