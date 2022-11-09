import { GetServerSideProps, NextPage } from "next";
import { withAuthRoute } from "src/common/utils/route.util";
import { CreateUser } from "src/modules/user";

const Page: NextPage = () => {
  return <CreateUser />;
};

export const getServerSideProps: GetServerSideProps = withAuthRoute(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

export default Page;
