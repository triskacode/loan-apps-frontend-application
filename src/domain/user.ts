import { UserRole, UserState } from "src/common/types";

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  state: UserState;
  created_at: Date;
  updated_at: Date;
}
