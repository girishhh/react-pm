import { AxiosResponse } from "axios";
import { KeyValue } from "../../interfaces/CommonInterface";
import { UserInterface, UserListResp } from "../../interfaces/UserInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { UserConstants } from "../../utils/constants/UserConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class UserService {
  static async fetchUserList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<UserListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      UserConstants.LIST_USER,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit, conditions })
      .build().getConfig;

    const result = await APIHelper.sendRequest<UserListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as UserListResp;
  }

  static async createUser(formData: UserInterface): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      UserConstants.CREATE_USER,
      HTTP_METHODS.POST
    )
      .addRequestBody(formData)
      .build().getConfig;

    const result = await APIHelper.sendRequest<UserInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async reSendConfirmation(email: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      UserConstants.RESEND_CONFIRMN_INSTRUCTIONS,
      HTTP_METHODS.POST
    )
      .addRequestBody({ email })
      .build().getConfig;

    const result = await APIHelper.sendRequest<{ email: string }>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }
}

export default UserService;
