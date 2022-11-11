import { AuthUtil, HttpUtil } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { GetStatsResponseDto } from "../dto/get-stats.dto";

export class AccountRepository {
  static async getStats(token?: string): Promise<GetStatsResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: GetStatsResponseDto = await HttpUtil.get(
      `${appConfig.service.account}/get-stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }
}
