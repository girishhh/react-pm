import { AxiosResponse } from "axios";
import { PaymentCharges } from "./PaymentCharges";
import { DefaultResponse } from "./StoreInterface";

export interface CompanyStoreState {
  companyList: DefaultResponse;
  companyDetails: DefaultResponse;
  companyUpdate: DefaultResponse;
  companyCreate: DefaultResponse;
  companyDelete: DefaultResponse;
}

export interface CompanyInterface {
  _id: string;
  name: string;
  city: string;
  subdomain: string;
  timeZone: string;
  paymentCharges: PaymentCharges;
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
    | "companies/update/error"
    | "companies/create/data"
    | "companies/create/loading"
    | "companies/create/error"
    | "companies/delete/data"
    | "companies/delete/loading"
    | "companies/delete/error";
  payload?: CompanyPayloadTypes;
};
