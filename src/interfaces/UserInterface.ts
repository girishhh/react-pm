import { AddressInterface } from "./AddressInterface";
import { CompanyInterface } from "./CompanyInterface";
import { RoleInterface } from "./RoleInterface";
import { DefaultResponse } from "./StoreInterface";

export interface UserInterface {
  firstName: string;
  lastName: string;
  address: AddressInterface;
  email: string;
  password: string;
  city: string;
  roles: RoleInterface[];
  active: boolean;
  token: string;
  company: CompanyInterface;
  populatePermissions: Function;
  JSON: Function;
  permissions: string[];
}

export interface UserStoreState {
  createUser: DefaultResponse;
  reSendConfirmation: DefaultResponse;
}

export interface CreateUserSuccessMsg {
  message: string;
}
export type UserPayloadTypes = UserInterface | CreateUserSuccessMsg;

export type UserAction = {
  type:
    | "createUser/data"
    | "createUser/loading"
    | "createUser/error"
    | "reSendConfirmation/data"
    | "reSendConfirmation/loading"
    | "reSendConfirmation/error";
  payload?: UserPayloadTypes;
};

export interface ReSendConfirmationStoreState {
  reSendConfirmation: DefaultResponse;
}

export interface ReSendConfirmationSuccessMsg {
  message: string;
}
