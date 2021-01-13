export enum UserConstants {
  CREATE_USER = "/users",
  RESEND_CONFIRMN_INSTRUCTIONS = "/users/resend-confirmation-instructions",
}

export enum UserActivationConstants {
  CONFIRMATION = "confirmation",
  PASSWORD = "password",
}

export const UserRoleURLMapForCreateUser = {
  owner: "restaurentId",
  companyAdmin: "companyId",
};

export const FormDataMapForCreateUser = {
  owner: "restaurent",
  companyAdmin: "company",
};
