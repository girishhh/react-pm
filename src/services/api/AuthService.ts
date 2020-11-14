import { Session } from "../../interfaces/CommonInterface";
import { AuthConstants } from "../../utils/constants/AuthConstants";
import { HTTP_METHODS } from "../../utils/constants/common";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";
import BrowserHelper from "../../utils/helpers/BrowserHelper";

class AuthService {
  static async login(email?: string, password?: string): Promise<Session> {
    const requestConfig = new APIParamsBuilderHelper(
      AuthConstants.LOGIN_API,
      HTTP_METHODS.POST
    )
      .addRequestBody({ email, password })
      .build().getConfig;

    const result = await APIHelper.sendRequest<Session>(requestConfig).catch(
      (err: string) => {
        throw err;
      }
    );
    const session: Session = result?.data;
    const { access_token: accessToken } = session;
    if (accessToken)
      BrowserHelper.setLocalStorageItem(AuthConstants.USER_TOKEN, accessToken);
    return session;
  }
}

export default AuthService;
