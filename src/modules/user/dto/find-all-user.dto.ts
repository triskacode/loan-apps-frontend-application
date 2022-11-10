import { UserRole, UserState } from "src/common/types";
import { HttpResponse } from "src/common/types/http-response.type";
import { User } from "src/domain/user";

export interface FilterFindAllUserDto {
  role?: UserRole;
  state?: UserState;
}

interface Data extends User {}

export interface FindAllUserResponseDto extends HttpResponse<Data[]> {}
