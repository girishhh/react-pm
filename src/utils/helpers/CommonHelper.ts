import { AxiosError } from "axios";
import { RoleInterface } from "../../interfaces/RoleInterface";

export const hasRole = (roles: RoleInterface[], roleName: string): boolean => {
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
