import { LoanState } from "src/common/types/loan.type";

export interface Loan {
  id: number;
  user_id: number;
  amount: number;
  state: LoanState;
  created_at: Date;
  updated_at: Date;
}
