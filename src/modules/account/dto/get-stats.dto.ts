import { HttpResponse } from "src/common/types";
import { AccountStats } from "src/domain/account";

interface Data extends AccountStats {}

export interface GetStatsResponseDto extends HttpResponse<Data> {}
