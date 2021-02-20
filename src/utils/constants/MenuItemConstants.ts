export enum MenuItemConstants {
  MENU_ITEM_LIST_API = "/menu-items",
  MENU_ITEM_DETAILS_API = "/menu-items/pathParams._id",
  MENU_ITEM_UPDATE_API = MENU_ITEM_DETAILS_API,
}

export const EDIT_PATH = new RegExp(
  "^/restaurents/(.){24}/menu-items/(.){24}/edit"
);
