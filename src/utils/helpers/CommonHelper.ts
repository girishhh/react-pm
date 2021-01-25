import { AxiosError } from "axios";
import { parseDomain } from "parse-domain";
import { RoleInterface } from "../../interfaces/RoleInterface";
import { ROLES } from "../constants/RoleConstants";

export const hasRole = (
  roles: RoleInterface[] | undefined,
  roleName: string
): boolean => {
  if (!roles) return false;
  let roleExists = false;
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === roleName) {
      roleExists = true;
      break;
    }
  }
  return roleExists;
};

export const formatResponseErrors = (error: AxiosError | any): string[] => {
  const errorArray = [];
  const errorMessage = error?.response?.data?.message;
  if (errorMessage) errorArray.push(errorMessage);

  const errors = error?.response?.data?.errors;
  if (errors) {
    for (const key in errors) {
      errorArray.push(errors[key].message);
    }
  }
  return errorArray;
};

export const isAdminDomain = (): boolean => {
  const parsedResult = parseDomain(window.location.host) as any;
  if (parsedResult.subDomains[0] === ROLES.ADMIN) return true;
  return false;
};
