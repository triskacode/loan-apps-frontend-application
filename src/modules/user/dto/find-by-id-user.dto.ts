import { HttpResponse } from "src/common/types/http-response.type";
import { User } from "src/domain/user";

interface Data extends User {}

export interface FindByIdUserResponseDto extends HttpResponse<Data> {}