import { GetServerSideProps, NextPage } from "next";
import { AuthUtil } from "src/common/utils";
import { Login } from "src/modules/auth";

const Page: NextPage = () => {
  return <Login />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = AuthUtil.getAccessToken(ctx);

  if (accessToken) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Page;
