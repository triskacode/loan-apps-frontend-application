import { AuthUtil, HttpUtil } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { CreatePaymentIntensDto, CreatePaymentIntensResponseDto } from "../dto/create-payment-intens.dto";
import { GetMyAccountResponseDto } from "../dto/get-my-account.dto";
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

  static async getMyAccount(token?: string): Promise<GetMyAccountResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: GetMyAccountResponseDto = await HttpUtil.get(
      `${appConfig.service.account}/my-account`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async createPaymentIntens(
    dto: CreatePaymentIntensDto,
    token?: string
  ): Promise<CreatePaymentIntensResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: CreatePaymentIntensResponseDto = await HttpUtil.post(
      `${appConfig.service.account}/create-payment`,
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
