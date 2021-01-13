import { AxiosResponse } from "axios";
import { DefaultResponse } from "./StoreInterface";
import { UserInterface } from "./UserInterface";

export interface SignUpStoreState {
  signUp: DefaultResponse;
}

export interface SignUpSuccessMsg {
  message: string;
}
export type SignUpPayloadTypes = UserInterface | SignUpSuccessMsg;

export type SignUpAction = {
  type: "signUp/data" | "signUp/loading" | "signUp/error";
  payload?: SignUpPayloadTypes;
};
