import { HttpResponse } from "src/common/types/http-response.type";
import { User } from "src/domain/user";

interface GetMeResponse extends User {}

export interface GetMeResponseDto extends HttpResponse<GetMeResponse> {}
