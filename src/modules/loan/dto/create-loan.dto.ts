import { HttpResponse } from "src/common/types";
import { Loan } from "src/domain/loan";

export interface CreateLoanDto {
  amount: number;
}

interface Data extends Loan {}

export interface CreateLoanResponseDto extends HttpResponse<Data> {}