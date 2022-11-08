import { GetServerSideProps, NextPage } from "next";
import { onlyWithoutAuthRoute } from "src/common/utils/route.util";
import { Login } from "src/modules/auth";

const Page: NextPage = () => {
  return <Login />;
};

export const getServerSideProps: GetServerSideProps = onlyWithoutAuthRoute(
  async (ctx) => {
    return {
      props: {},
    };
  }
);

export default Page;
