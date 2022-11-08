import { GetServerSideProps, NextPage } from "next";
import { withAuthRoute } from "src/common/utils/route.util";
import { User } from "src/modules/user";

const Page: NextPage = () => {
  return <User />;
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

export default Page;
