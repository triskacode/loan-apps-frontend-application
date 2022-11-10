import { HttpResponse } from "src/common/types";
import { LoanState } from "src/common/types/loan.type";
import { Loan } from "src/domain/loan";

export interface FilterFindAllLoanDto {
  state?: LoanState;
}

interface Data extends Loan {}

export interface FindAllLoanResponseDto extends HttpResponse<Data[]> {}
