import { LoanState } from "src/common/types";

interface PrivateUser {
  id: number;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Loan {
  id: number;
  user_id: number;
  amount: number;
  state: LoanState;
  created_at: Date;
  updated_at: Date;
  user: PrivateUser;
}
