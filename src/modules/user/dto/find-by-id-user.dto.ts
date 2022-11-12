import { HttpResponse } from "src/common/types";
import { User } from "src/domain/user";

interface Data extends User {}

export interface FindByIdUserResponseDto extends HttpResponse<Data> {}
