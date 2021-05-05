import { AxiosResponse } from "axios";
import { CompanyInterface } from "./CompanyInterface";
import { DefaultResponse } from "./StoreInterface";

export interface AddressStoreState {
  addressList: DefaultResponse;
  addressDetails: DefaultResponse;
  addressUpdate: DefaultResponse;
  addressCreate: DefaultResponse;
  addressDelete: DefaultResponse;
}

export interface AddressListReqPayLoad {
  start: number;
  limit: number;
  conditions: string;
}

export interface AddressDetailsPayload {
  _id: string;
}

export interface AddressDetailsResp {
  addressDetails: AddressInterface;
}

export interface AddressListResp {
  total: number;
  addressList: AddressInterface[];
}

export type AddressPayloadTypes =
  | AddressListReqPayLoad
  | AddressListResp
  | AddressDetailsPayload
  | AddressDetailsResp
  | AddressInterface
  | AxiosResponse;

export type AddressAction = {
  type:
    | "addresss/list/data"
    | "addresss/list/loading"
    | "addresss/list/error"
    | "addresss/details/data"
    | "addresss/details/loading"
    | "addresss/details/error"
    | "addresss/update/data"
    | "addresss/update/loading"
    | "addresss/update/error"
    | "addresss/create/data"
    | "addresss/create/loading"
    | "addresss/create/error"
    | "addresss/delete/data"
    | "addresss/delete/loading"
    | "addresss/delete/error";
  payload?: AddressPayloadTypes;
};

export interface AddressInterface {
  _id: string;
  country: string;
  city: string;
  state: string;
  district: string;
  postalCode: string;
  house: String;
  street: String;
  landMark: String;
  primary: Boolean;
  modelId: string;
  modelName: string;
  company: CompanyInterface;
}
