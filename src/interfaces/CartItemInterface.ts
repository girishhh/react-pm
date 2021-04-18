import { AxiosResponse } from "axios";
import { CartInterface } from "./CartInterface";
import { CompanyInterface } from "./CompanyInterface";
import { FoodItemInterface } from "./FoodItemInterface";
import { RestaurentInterface } from "./RestaurentInterface";
import { DefaultResponse } from "./StoreInterface";

export interface CartItemCreateResponse {
  status: number;
  cart: CartInterface;
}

export interface CartItemStoreState {
  cartItemCreate: DefaultResponse;
  cartItemUpdate: DefaultResponse;
  cartItemDelete: DefaultResponse;
  cartRefresh: DefaultResponse;
}

export interface CreateCartItemRequestInterface {
  price: number;
  quantity: number;
  restaurent: RestaurentInterface | string;
  foodItem: FoodItemInterface | string;
}

export interface CartItemInterface {
  _id: string;
  price: number;
  quantity: number;
  restaurent: RestaurentInterface | string;
  foodItem: FoodItemInterface | string;
  cart: CartInterface | string;
  company: CompanyInterface | string;
}

export type CartItemPayloadTypes =
  | CartItemInterface
  | AxiosResponse
  | FoodItemInterface;

export type CartItemAction = {
  type:
    | "cart-items/create/data"
    | "cart-items/create/loading"
    | "cart-items/create/error"
    | "cart-items/update/data"
    | "cart-items/update/loading"
    | "cart-items/update/error"
    | "cart-items/delete/data"
    | "cart-items/delete/loading"
    | "cart-items/delete/error"
    | "cart-items/refreshCart/data"
    | "cart-items/refreshCart/loading"
    | "cart-items/refreshCart/error"
    | "cart-items/getFoodItem/loading"
    | "cart-items/getFoodItem/data"
    | "cart-items/updateFoodItem/data";
  payload?: CartItemPayloadTypes;
};
