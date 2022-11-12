import { HttpResponse } from "src/common/types";
import { PaymentIntens } from "src/domain/account";

export interface CreatePaymentIntensDto {
  amount: number;
}

interface Data extends PaymentIntens {}

export interface CreatePaymentIntensResponseDto extends HttpResponse<Data> {}
