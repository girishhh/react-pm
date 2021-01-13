export enum AuthConstants {
  LOGIN_API = "/users/sign-in",
  USER_TOKEN = "digitalUserToken",
  SIGN_UP = "/users/sign-up",
  ACTIVATE_ACCOUNT = "/users/activate-account",
}

export const ActivateAccountSuccessMsgs = {
  confirmation: "Account Activation successfull.",
  password: "Password has set up successfully.",
};

export const AllowedTokenTypes = ["confirmation", "password"];
