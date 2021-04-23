export enum CartItemConstants {
  CART_ITEM_CREATE_API = "/cart-items",
  CART_ITEM_REFRESH_CART_API = "/cart-items/refreshCart",
  CART_ITEM_UPDATE_API = "/cart-items/pathParams._id",
  CART_ITEM_DELETE_API = CART_ITEM_UPDATE_API,
}

export const CART_ALREADY_EXISTS_ERROR = "CART_EXISTS_FOR_OTHER_RESTAURENT";
