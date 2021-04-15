export enum UserConstants {
  CREATE_USER = "/users",
  UPDATE_USER = "/users/pathParams._id",
  LIST_USER = CREATE_USER,
  RESEND_CONFIRMN_INSTRUCTIONS = "/users/resend-confirmation-instructions",
  USER_CART_DETAILS = "/users/cartDetails",
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
