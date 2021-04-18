import { AxiosResponse } from "axios";
import { CartItemInterface } from "./CartItemInterface";
import { CompanyInterface } from "./CompanyInterface";
import { FoodCategoryInterface } from "./FoodCategoryInterface";
import { RestaurentInterface } from "./RestaurentInterface";
import { DefaultResponse } from "./StoreInterface";

export interface FoodItemStoreState {
  foodItemList: DefaultResponse;
  foodItemDetails: DefaultResponse;
  foodItemUpdate: DefaultResponse;
  foodItemCreate: DefaultResponse;
  foodItemDelete: DefaultResponse;
  indexedFoodItems: {};
}

export interface FoodItemInterface {
  _id: string;
  name: string;
  type: string;
  price: number;
  cartItem: CartItemInterface;
  categories: FoodCategoryInterface[];
  restaurent: RestaurentInterface;
  company: CompanyInterface;
}

export interface FoodItemListReqPayLoad {
  start: number;
  limit: number;
  conditions: string;
}

export interface FoodItemDetailsPayload {
  _id: string;
}

export interface FoodItemDetailsResp {
  foodItemDetails: FoodItemInterface;
}

export interface FoodItemListResp {
  total: number;
  foodItemList: FoodItemInterface[];
}

export type FoodItemPayloadTypes =
  | FoodItemListReqPayLoad
  | FoodItemListResp
  | FoodItemDetailsPayload
  | FoodItemDetailsResp
  | FoodItemInterface
  | AxiosResponse;

export type FoodItemAction = {
  type:
    | "food-items/list/data"
    | "food-items/list/loading"
    | "food-items/list/error"
    | "food-items/details/data"
    | "food-items/details/loading"
    | "food-items/details/error"
    | "food-items/update/data"
    | "food-items/update/loading"
    | "food-items/update/error"
    | "food-items/create/data"
    | "food-items/create/loading"
    | "food-items/create/error"
    | "food-items/delete/data"
    | "food-items/delete/loading"
    | "food-items/delete/error";

  payload?: FoodItemPayloadTypes;
};
