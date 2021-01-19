export enum UserConstants {
  CREATE_USER = "/users",
  LIST_USER = CREATE_USER,
  RESEND_CONFIRMN_INSTRUCTIONS = "/users/resend-confirmation-instructions",
}

export enum UserActivationConstants {
  CONFIRMATION = "confirmation",
  PASSWORD = "password",
}

export const UserRoleURLMapForCreateUser = {
  owner: "restaurentId",
  companyAdmin: "companyId",
  deliveryBoy: "companyId",
};

export const FormDataMapForCreateUser = {
  owner: "restaurent",
  companyAdmin: "company",
  deliveryBoy: "company",
};

export const OwnerSearchQuery = {
  roles: { eq: ["owner"] },
  email: { contains: "" },
  restaurents: { ne: ["600098a6cce5760a882734c1"] },
};
