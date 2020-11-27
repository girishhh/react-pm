import { AxiosError } from "axios";

export interface DefaultResponse {
  data: any;
  state: string;
  error: null | AxiosError;
}
