import { HttpResponse } from "src/common/types/http-response.type";

export interface LoginDto {
  email: string;
  password: string;
}

interface Data {
  accessToken: string;
}

export interface LoginResponseDto extends HttpResponse<Data> {}
