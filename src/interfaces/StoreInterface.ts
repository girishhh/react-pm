import { AxiosError } from "axios";

export interface DefaultResponse {
  data: any;
  state: string;
  error: null | AxiosError;
}

export interface DefaultResponseWithState {
  data: any;
  state: { id: string; value: string };
  error: null | AxiosError;
}
