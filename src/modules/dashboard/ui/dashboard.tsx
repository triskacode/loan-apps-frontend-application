import React from "react";
import { UserRole } from "src/common/types";
import { useMe } from "src/modules/auth/use-case/use-me";
import { Manager } from "./manager";
import { User } from "./user";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const { data: me } = useMe();

  return me?.role === UserRole.MANAGER ? <Manager /> : <User />;
};
