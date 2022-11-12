import { UserRole, UserState, HttpResponse } from "src/common/types";
import { User } from "src/domain/user";

export interface FilterFindAllUserDto {
  role?: UserRole;
  state?: UserState;
}

interface Data extends User {}

export interface FindAllUserResponseDto extends HttpResponse<Data[]> {}
