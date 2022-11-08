import { Layout } from "src/common/ui";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    </Layout>
  );
};
