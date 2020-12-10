import { CompanyInterface } from "./CompanyInterface";

export interface AddressInterface {
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
