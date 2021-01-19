export enum RestaurentConstants {
  RESTAURENT_LIST_API = "/restaurents",
  RESTAURENT_DETAILS_API = "/restaurents/pathParams._id",
  RESTAURENT_UPDATE_API = RESTAURENT_DETAILS_API,
}

export const EDIT_PATH = new RegExp("^/restaurents/edit");
