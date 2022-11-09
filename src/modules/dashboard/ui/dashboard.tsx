import React, { useCallback } from "react";
import { Container } from "./partials/container";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <Container>
      <div>Dashboard</div>
    </Container>
  );
};
