import { DefaultResponse } from "./StoreInterface";

export interface ActivateAccountStoreState {
  activateAccount: DefaultResponse;
}

export interface ActivateAccountPayload {
  token: string;
  password?: string;
}

export interface ActivateAccountSuccessMsg {
  message: string;
}

export type ActivateAccountPayloadTypes =
  | ActivateAccountPayload
  | ActivateAccountSuccessMsg;

export type ActivateAccountAction = {
  type:
    | "activateAccount/data"
    | "activateAccount/loading"
    | "activateAccount/error";
  payload?: ActivateAccountPayloadTypes;
};

export interface CreatePasswordForm {
  password: string;
  confirmPassword: string;
}
