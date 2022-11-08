import { GetServerSideProps, NextPage } from "next";
import { withAuthRoute } from "src/common/utils/route.util";
import { Dashboard } from "src/modules/dashboard";

const Page: NextPage = () => {
  return <Dashboard />;
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

export default Page;
