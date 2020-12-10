import { AddressInterface } from "./AddressInterface";
import { CompanyInterface } from "./CompanyInterface";
import { RoleInterface } from "./RoleInterface";

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
