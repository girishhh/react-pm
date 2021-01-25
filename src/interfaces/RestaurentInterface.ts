import { AxiosResponse } from "axios";
import { AddressInterface } from "./AddressInterface";
import { DefaultResponse } from "./StoreInterface";

export interface RestaurentInterface {
  _id: string;
  name: string;
  address: AddressInterface;
  company: string;
  lat: number;
  lng: number;
  geo_location_description: string;
}

export interface RestaurentStoreState {
  restaurentList: DefaultResponse;
  restaurentDetails: DefaultResponse;
  restaurentUpdate: DefaultResponse;
  restaurentCreate: DefaultResponse;
  restaurentDelete: DefaultResponse;
}

export interface RestaurentListReqPayLoad {
  start: number;
  limit: number;
  conditions: string;
}

export interface RestaurentDetailsPayload {
  _id: string;
}

export interface RestaurentDetailsResp {
  restaurentDetails: RestaurentInterface;
}

export interface RestaurentListResp {
  total: number;
  restaurentList: RestaurentInterface[];
}

export type RestaurentPayloadTypes =
  | RestaurentListReqPayLoad
  | RestaurentListResp
  | RestaurentDetailsPayload
  | RestaurentDetailsResp
  | RestaurentInterface
  | AxiosResponse;

export type RestaurentAction = {
  type:
    | "restaurents/list/data"
    | "restaurents/list/loading"
    | "restaurents/list/error"
    | "restaurents/details/data"
    | "restaurents/details/loading"
    | "restaurents/details/error"
    | "restaurents/details/reset"
    | "restaurents/update/data"
    | "restaurents/update/loading"
    | "restaurents/update/error"
    | "restaurents/create/data"
    | "restaurents/create/loading"
    | "restaurents/create/error"
    | "restaurents/delete/data"
    | "restaurents/delete/loading"
    | "restaurents/delete/error";
  payload?: RestaurentPayloadTypes;
};
