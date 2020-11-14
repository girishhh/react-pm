/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
/**
 * @class APIHelper
 * @description A common class for wrapping all axios requests
 */
class APIHelper {
  public static sendRequest<Type>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<Type>> {
    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default APIHelper;
