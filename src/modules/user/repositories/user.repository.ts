import { AuthUtil, HttpUtil } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user";
import { FindAllUserResponseDto } from "../dto/find-all-user.dto";
import { FindByIdUserResponseDto } from "../dto/find-by-id-user.dto";

export class UserRepository {
  static async findAll(token?: string): Promise<FindAllUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: FindAllUserResponseDto = await HttpUtil.get(
      `${appConfig.service.user}/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async findById(
    id: number,
    token?: string
  ): Promise<FindByIdUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: FindByIdUserResponseDto = await HttpUtil.get(
      `${appConfig.service.user}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async create(
    dto: CreateUserDto,
    token?: string
  ): Promise<CreateUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: CreateUserResponseDto = await HttpUtil.post(
      `${appConfig.service.user}/user`,
      {
        data: dto,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
}
