import { HttpResponse } from "src/common/types";

export interface LoginDto {
  email: string;
  password: string;
}

interface Data {
  accessToken: string;
}

export interface LoginResponseDto extends HttpResponse<Data> {}
