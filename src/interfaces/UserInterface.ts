import { AddressInterface } from "./AddressInterface";
import { CompanyInterface } from "./CompanyInterface";
import { RestaurentInterface } from "./RestaurentInterface";
import { RoleInterface } from "./RoleInterface";
import { DefaultResponse } from "./StoreInterface";

export interface UserInterface {
  _id: string;
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
  restaurents: RestaurentInterface[] | string[];
}

export interface UserStoreState {
  userCreate: DefaultResponse;
  userList: DefaultResponse;
  userUpdate: DefaultResponse;
  reSendConfirmation: DefaultResponse;
}

export interface CreateUserSuccessMsg {
  message: string;
}

export interface UserListResp {
  total: number;
  userList: UserInterface[];
}

export interface UserListReqPayLoad {
  start: number;
  limit: number;
  conditions: string;
}

export type UserPayloadTypes =
  | UserInterface
  | CreateUserSuccessMsg
  | UserListResp;

export type UserAction = {
  type:
    | "users/create/data"
    | "users/create/loading"
    | "users/create/error"
    | "users/reSendConfirmation/data"
    | "users/reSendConfirmation/loading"
    | "users/reSendConfirmation/error"
    | "users/list/data"
    | "users/list/loading"
    | "users/list/error"
    | "users/list/reset"
    | "users/update/data"
    | "users/update/loading"
    | "users/update/error";
  payload?: UserPayloadTypes;
};

export interface ReSendConfirmationStoreState {
  reSendConfirmation: DefaultResponse;
}

export interface ReSendConfirmationSuccessMsg {
  message: string;
}
