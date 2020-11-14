import { AxiosRequestConfig, Method } from "axios";

interface APIParam {
  [key: string]: string | number;
}

class APIParamsBuilderHelper {
  private config: AxiosRequestConfig = {};

  constructor(path: string, method: Method) {
    this.config.url = path;
    this.config.method = method;
  }

  /**
   * @method config
   * @description Returns the config object that was built.
   */
  public get getConfig(): AxiosRequestConfig {
    return this.config;
  }

  /**
   * @method addQueryParams
   * @description Adds query params to the config object
   * @param queryParams
   */
  addQueryParams(queryParams: APIParam): APIParamsBuilderHelper {
    this.config.params = queryParams;
    return this;
  }

  /**
   * @method addPathParams
   * @description Adds path params to the config object
   * @param pathParams
   */
  addPathParams(pathParams: APIParam): APIParamsBuilderHelper {
    Object.entries(pathParams).forEach(([key, value]) => {
      this.config.url = this.config.url?.replace(
        `pathParams.${key}`,
        encodeURIComponent(value)
      );
    });
    return this;
  }

  /**
   * @method addRequestBody
   * @description Adds data to be sent with the request. Required for PUT and POST.
   * @param requestBody
   */
  addRequestBody<T>(requestBody: T): APIParamsBuilderHelper {
    this.config.data = requestBody;
    return this;
  }

  /**
   * @method build
   * @description Builds the final object.
   * @returns Returns the final built object.
   */
  build(): APIParamsBuilderHelper {
    return this;
  }
}

export default APIParamsBuilderHelper;
