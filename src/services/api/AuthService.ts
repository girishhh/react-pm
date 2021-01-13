import { AxiosResponse } from "axios";
import { ActivateAccountPayload } from "../../interfaces/ActivateAccountInterface";
import { Session } from "../../interfaces/CommonInterface";
import { UserInterface } from "../../interfaces/UserInterface";
import { AuthConstants } from "../../utils/constants/AuthConstants";
import { HTTP_METHODS } from "../../utils/constants/common";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";
import BrowserHelper from "../../utils/helpers/BrowserHelper";

class AuthService {
  static async login(
    email: string,
    password: string,
    role?: string
  ): Promise<Session> {
    const requestBody: { email: string; password: string; role?: string } = {
      email,
      password,
    };
    if (role) requestBody.role = role;
    const requestConfig = new APIParamsBuilderHelper(
      AuthConstants.LOGIN_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(requestBody)
      .build().getConfig;

    const result = await APIHelper.sendRequest<Session>(requestConfig).catch(
      (err: string) => {
        throw err;
      }
    );
    const session: Session = result?.data;
    const { accessToken } = session;
    if (accessToken)
      BrowserHelper.setLocalStorageItem(AuthConstants.USER_TOKEN, accessToken);
    return session;
  }

  static async signUp(signUpFormData: UserInterface): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      AuthConstants.SIGN_UP,
      HTTP_METHODS.POST
    )
      .addRequestBody(signUpFormData)
      .build().getConfig;

    const result = await APIHelper.sendRequest<UserInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async activateAccount(
    payload: ActivateAccountPayload
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      AuthConstants.ACTIVATE_ACCOUNT,
      HTTP_METHODS.PUT
    )
      .addRequestBody(payload)
      .build().getConfig;

    const result = await APIHelper.sendRequest<ActivateAccountPayload>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }
}

export default AuthService;
