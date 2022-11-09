import { HttpResponse } from "src/common/types/http-response.type";
import { User } from "src/domain/user";
import { CreateUserDto } from "./create-user.dto";

export interface UpdateUserDto extends Partial<CreateUserDto> {}

interface Data extends User {}

export interface UpdateUserResponseDto extends HttpResponse<Data> {}
