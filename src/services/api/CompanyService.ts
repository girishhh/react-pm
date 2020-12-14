import { AxiosResponse } from "axios";
import {
  CompanyDetailsResp,
  CompanyInterface,
  CompanyListResp,
} from "../../interfaces/CompanyInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { CompanyConstants } from "../../utils/constants/CompanyConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class CompanyService {
  static async fetchCompanyList(
    start: number,
    limit: number
  ): Promise<CompanyListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      CompanyConstants.COMPANY_LIST_API,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit })
      .build().getConfig;

    const result = await APIHelper.sendRequest<CompanyListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as CompanyListResp;
  }

  static async fetchCompanyDetails(_id: string): Promise<CompanyDetailsResp> {
    const requestConfig = new APIParamsBuilderHelper(
      CompanyConstants.COMPANY_DETAILS_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<CompanyDetailsResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as CompanyDetailsResp;
  }

  static async updateCompany(
    company: CompanyInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CompanyConstants.COMPANY_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: company._id })
      .addRequestBody(company)
      .build().getConfig;

    const result = await APIHelper.sendRequest<CompanyInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async createCompany(
    company: CompanyInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CompanyConstants.COMPANY_LIST_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(company)
      .build().getConfig;

    const result = await APIHelper.sendRequest<CompanyInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteCompany(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CompanyConstants.COMPANY_DETAILS_API,
      HTTP_METHODS.DELETE
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest(requestConfig).catch(
      (err: string) => {
        throw err;
      }
    );
    return result;
  }
}

export default CompanyService;
