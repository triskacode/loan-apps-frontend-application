import { AuthUtil, HttpUtil } from "src/common/utils";
import { appConfig } from "src/config/app.config";
import { CreateLoanDto, CreateLoanResponseDto } from "../dto/create-loan.dto";
import { DeleteLoanResponseDto } from "../dto/delete-loan.dto";
import {
  FilterFindAllLoanDto,
  FindAllLoanResponseDto,
} from "../dto/find-all-loan.dto";
import { UpdateLoanResponseDto } from "../dto/update-loan.dto";

export class LoanRepository {
  static async findAll(
    filter?: FilterFindAllLoanDto,
    token?: string
  ): Promise<FindAllLoanResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: FindAllLoanResponseDto = await HttpUtil.get(
      `${appConfig.service.loan}/loan`,
      {
        params: filter,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async findMyLoan(
    filter?: FilterFindAllLoanDto,
    token?: string
  ): Promise<FindAllLoanResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: FindAllLoanResponseDto = await HttpUtil.get(
      `${appConfig.service.loan}/loan/my-loan`,
      {
        params: filter,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async create(
    dto: CreateLoanDto,
    token?: string
  ): Promise<CreateLoanResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: CreateLoanResponseDto = await HttpUtil.post(
      `${appConfig.service.loan}/loan`,
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

  static async approve(
    id: number,
    token?: string
  ): Promise<UpdateLoanResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: UpdateLoanResponseDto = await HttpUtil.patch(
      `${appConfig.service.loan}/loan/${id}?action=approve`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async reject(
    id: number,
    token?: string
  ): Promise<UpdateLoanResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: UpdateLoanResponseDto = await HttpUtil.patch(
      `${appConfig.service.loan}/loan/${id}?action=reject`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }

  static async delete(
    id: number,
    token?: string
  ): Promise<DeleteLoanResponseDto> {
    const accessToken = token ?? AuthUtil.getAccessToken();

    const response: DeleteLoanResponseDto = await HttpUtil.delete(
      `${appConfig.service.loan}/loan/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  }
}
