import React from "react";
import { Copyright } from "src/common/ui/copyright";
import { BaseLayout } from "src/common/ui/layout";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <BaseLayout>
      <div className="w-full min-h-screen flex flex-col items-center justify-center py-5">
        <main className="flex-auto w-full flex flex-col items-center justify-center">
          {children}
        </main>
        <footer className="w-full px-5 pt-5">
          <Copyright />
        </footer>
      </div>
    </BaseLayout>
  );
};
