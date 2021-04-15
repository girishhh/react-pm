import { AxiosResponse } from "axios";
import { CartInterface } from "../../interfaces/CartInterface";
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

  static async updateUser(user: UserInterface): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      UserConstants.UPDATE_USER,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: user._id })
      .addRequestBody(user)
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

  static async getUserCartDetails(): Promise<CartInterface> {
    const requestConfig = new APIParamsBuilderHelper(
      UserConstants.USER_CART_DETAILS,
      HTTP_METHODS.GET
    ).build().getConfig;

    const result = await APIHelper.sendRequest<CartInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as CartInterface;
  }
}

export default UserService;
