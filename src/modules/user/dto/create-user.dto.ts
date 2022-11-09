import { UserRole } from "src/common/types";
import { HttpResponse } from "src/common/types/http-response.type";
import { User } from "src/domain/user";

export interface CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
}

interface Data extends User {}

export interface CreateUserResponseDto extends HttpResponse<Data> {}
