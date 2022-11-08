import { AuthUtil, HttpUtil } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { FindAllDto } from "../dto/find-all.dto";

export class UserRepository {
  static async findAll(token?: string): Promise<FindAllDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: FindAllDto = await HttpUtil.get(
      `${appConfig.service.user}/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }
}
