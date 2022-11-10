import { AuthUtil, HttpUtil } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { CreateUserDto, CreateUserResponseDto } from "../dto/create-user.dto";
import { DeleteUserResponseDto } from "../dto/delete-user.dto";
import {
  FilterFindAllUserDto,
  FindAllUserResponseDto,
} from "../dto/find-all-user.dto";
import { FindByIdUserResponseDto } from "../dto/find-by-id-user.dto";
import { UpdateUserDto, UpdateUserResponseDto } from "../dto/update-user.dto";

export class UserRepository {
  static async findAll(
    filter?: FilterFindAllUserDto,
    token?: string
  ): Promise<FindAllUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: FindAllUserResponseDto = await HttpUtil.get(
      `${appConfig.service.user}/user`,
      {
        params: filter,
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

  static async update(
    id: number,
    dto: UpdateUserDto,
    token?: string
  ): Promise<UpdateUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: UpdateUserResponseDto = await HttpUtil.patch(
      `${appConfig.service.user}/user/${id}`,
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

  static async activate(
    id: number,
    token?: string
  ): Promise<UpdateUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: UpdateUserResponseDto = await HttpUtil.patch(
      `${appConfig.service.user}/user/${id}?action=activate`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async suspend(
    id: number,
    token?: string
  ): Promise<UpdateUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: UpdateUserResponseDto = await HttpUtil.patch(
      `${appConfig.service.user}/user/${id}?action=suspend`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async softDelete(
    id: number,
    token?: string
  ): Promise<UpdateUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: UpdateUserResponseDto = await HttpUtil.patch(
      `${appConfig.service.user}/user/${id}?action=soft-delete`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async restore(
    id: number,
    token?: string
  ): Promise<UpdateUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: UpdateUserResponseDto = await HttpUtil.patch(
      `${appConfig.service.user}/user/${id}?action=restore`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }

  static async delete(
    id: number,
    token?: string
  ): Promise<DeleteUserResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: DeleteUserResponseDto = await HttpUtil.delete(
      `${appConfig.service.user}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }
}
