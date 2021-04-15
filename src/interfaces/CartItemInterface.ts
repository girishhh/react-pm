import { AxiosResponse } from "axios";
import { CartInterface } from "./CartInterface";
import { CompanyInterface } from "./CompanyInterface";
import { FoodItemInterface } from "./FoodItemInterface";
import { DefaultResponse } from "./StoreInterface";

export interface CartItemStoreState {
  cartItemCreate: DefaultResponse;
  cartItemUpdate: DefaultResponse;
  cartItemDelete: DefaultResponse;
  cartRefresh: DefaultResponse;
}

export interface CartItemInterface {
  _id: string;
  price: number;
  quantity: number;
  foodItem: FoodItemInterface | string;
  cart: CartInterface | string;
  company: CompanyInterface | string;
}

export type CartItemPayloadTypes = CartItemInterface | AxiosResponse;

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
    | "cart-items/refreshCart/error";
  payload?: CartItemPayloadTypes;
};
