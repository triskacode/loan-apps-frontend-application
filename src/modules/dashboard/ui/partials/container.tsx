import React from "react";
import { DashboardLayout } from "src/common/ui/layout";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
