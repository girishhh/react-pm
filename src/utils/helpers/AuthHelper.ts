import { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { HTTP_METHODS } from "../constants/common";
import BrowserHelper from "./BrowserHelper";
import axios from "axios";
import { AuthConstants } from "../constants/AuthConstants";
import jwtDecode from "jwt-decode";
import { UserInterface } from "../../interfaces/UserInterface";
import { parseDomain } from "parse-domain";

export const isLoggedIn = (): boolean => {
  return !!BrowserHelper.getLocalStorageItem(AuthConstants.USER_TOKEN);
};

export const getUser = (): UserInterface | undefined => {
  if (isLoggedIn()) {
    const token = BrowserHelper.getLocalStorageItem(AuthConstants.USER_TOKEN);

    if (!token) {
      throw new Error("Could not retrieve user token");
    }

    return jwtDecode(token) as UserInterface;
  }

  return undefined;
};

export const signOut = () => {
  BrowserHelper.deleteLocalStorageItem(AuthConstants.USER_TOKEN);
};

// Setting the default base url to which the path should be appended.

export function setBaseUrl(url: string): void {
  axios.defaults.baseURL = url;
}

export function addRequestInterceptors(
  successCb?: (
    res: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  errorCb?: (err: AxiosError) => Promise<AxiosError>
): number {
  // Attach JWT token to all outgoing AJAX requests
  return axios.interceptors.request.use(successCb, errorCb);
}

export function removeRequestInterceptors(id: number): void {
  axios.interceptors.request.eject(id);
}

export function addResponseInterceptors<T>(
  successCb?: (
    res: AxiosResponse<T>
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>,
  errorCb?: (err: AxiosError) => Promise<AxiosError>
): number {
  return axios.interceptors.response.use(successCb, errorCb);
}

export function removeResponseInterceptors(id: number): void {
  axios.interceptors.response.eject(id);
}

setBaseUrl(`${process.env.REACT_APP_BASE_URL}`);

addRequestInterceptors(
  // Attach JWT token to header and add user query param to all outgoing requests
  (config) => {
    const isQueryParam =
      config.method?.toLocaleLowerCase() ===
        HTTP_METHODS.GET.toLocaleLowerCase() ||
      config.method?.toLocaleLowerCase() ===
        HTTP_METHODS.DELETE.toLocaleLowerCase();
    const isBodyParam =
      config.method?.toLocaleLowerCase() ===
        HTTP_METHODS.POST.toLocaleLowerCase() ||
      config.method?.toLocaleLowerCase() ===
        HTTP_METHODS.PUT.toLocaleLowerCase();

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${BrowserHelper.getLocalStorageItem(
          AuthConstants.USER_TOKEN
        )}`,
        subdomain: `${
          (parseDomain(window.location.hostname) as any).subDomains[0]
        }`,
      },
      params: {
        ...config.params,
      },
      data: {
        ...config.data,
      },
    };
  },
  (error) => Promise.reject(error)
);

addResponseInterceptors(
  (response) => Promise.resolve(response),
  (error) => {
    // the API rejected our token
    if (error.response?.status === 401) {
      // AuthService.logout();
    }
    return Promise.reject(error);
  }
);
