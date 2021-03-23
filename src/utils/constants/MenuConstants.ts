export enum MenuConstants {
  MENU_LIST_API = "/menus",
  MENU_DETAILS_API = "/menus/pathParams._id",
  MENU_UPDATE_API = MENU_DETAILS_API,
  MENU_ACTIVATE = "/menus/pathParams._id/activate",
}

export const EDIT_PATH = new RegExp("^/restaurents/(.){24}/menus/(.){24}/edit");
