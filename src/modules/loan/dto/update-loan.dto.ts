import { HttpResponse } from "src/common/types";
import { Loan } from "src/domain/loan";

interface Data extends Loan {}

export interface UpdateLoanResponseDto extends HttpResponse<Data> {}
