import React from "react";
import { Container } from "./partials/container";

interface UserProps {}

export const User: React.FC<UserProps> = () => {
  return (
    <Container>
      <div>User</div>
    </Container>
  );
};
