import { AuthUtil, HttpUtil } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { GetMeResponseDto } from "../dto/get-me.dto";
import { LoginDto, LoginResponseDto } from "../dto/login.dto";

export class AuthRepository {
  static async getMe(token?: string): Promise<GetMeResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: GetMeResponseDto = await HttpUtil.get(
      `${appConfig.service.auth}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const response: LoginResponseDto = await HttpUtil.post(
      `${appConfig.service.auth}/auth/login`,
      {
        data: loginDto,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
}
