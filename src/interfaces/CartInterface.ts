import { AxiosResponse } from "axios";
import { CartItemInterface } from "./CartItemInterface";
import { CompanyInterface } from "./CompanyInterface";
import { RestaurentInterface } from "./RestaurentInterface";
import { DefaultResponse } from "./StoreInterface";
import { UserInterface } from "./UserInterface";

export interface CartInterface {
  _id: string;
  gst: number;
  grandTotal: number;
  subTotal: number;
  cartItems: CartItemInterface[];
  restaurent: RestaurentInterface | string;
  customer: UserInterface | string;
  company: CompanyInterface | string;
}

export interface CartStoreState {
  cartDetails: DefaultResponse;
  cartUpdate: DefaultResponse;
}

export type CartPayloadTypes = CartInterface | AxiosResponse | CartInterface;

export type CartAction = {
  type:
    | "carts/details/data"
    | "carts/details/loading"
    | "carts/details/error"
    | "carts/update/data"
    | "carts/update/loading"
    | "carts/update/error";
  payload?: CartPayloadTypes;
};
