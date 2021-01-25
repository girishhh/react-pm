export enum FoodItemConstants {
  FOOD_ITEM_LIST_API = "/food-items",
  FOOD_ITEM_DETAILS_API = "/food-items/pathParams._id",
  FOOD_ITEM_UPDATE_API = FOOD_ITEM_DETAILS_API,
}

export enum FoodTypes {
  VEG = "veg",
  NON_VEG = "nonVeg",
}

export const EDIT_PATH = new RegExp("^/restaurents/(.){24}/food-items/edit");
