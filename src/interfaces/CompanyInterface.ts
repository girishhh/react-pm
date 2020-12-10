import { AxiosResponse } from "axios";
import { DefaultResponse } from "./StoreInterface";

export interface CompanyStoreState {
  companyList: DefaultResponse;
  companyDetails: DefaultResponse;
  companyUpdate: DefaultResponse;
}

export interface CompanyInterface {
  _id: string;
  name: string;
  city: string;
  subdomain: string;
  timeZone: string;
}

export interface CompanyListReqPayLoad {
  start: number;
  limit: number;
}

export interface CompanyDetailsPayload {
  _id: string;
}

export interface CompanyDetailsResp {
  companyDetails: CompanyInterface;
}

export interface CompanyListResp {
  total: number;
  companyList: CompanyInterface[];
}

export type CompanyPayloadTypes =
  | CompanyListReqPayLoad
  | CompanyListResp
  | CompanyDetailsPayload
  | CompanyDetailsResp
  | CompanyInterface
  | AxiosResponse;

export type CompanyAction = {
  type:
    | "companies/list/data"
    | "companies/list/loading"
    | "companies/list/error"
    | "companies/details/data"
    | "companies/details/loading"
    | "companies/details/error"
    | "companies/update/data"
    | "companies/update/loading"
    | "companies/update/error";
  payload?: CompanyPayloadTypes;
};
