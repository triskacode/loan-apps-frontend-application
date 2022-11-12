export interface Account {
  id: number;
  customer_id: string;
  email: string;
  loan_balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface PaymentIntens {
  client_secret: string;
}

export interface AccountStats {
  count_account: number;
  loan_balance: number;
}
