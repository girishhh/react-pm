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
