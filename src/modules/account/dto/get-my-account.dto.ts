import { HttpResponse } from "src/common/types";
import { Account } from "src/domain/account";

interface Data extends Account {}

export interface GetMyAccountResponseDto extends HttpResponse<Data> {}
