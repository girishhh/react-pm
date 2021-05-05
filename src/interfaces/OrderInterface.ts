import { AxiosResponse } from "axios";
import { CompanyInterface } from "./CompanyInterface";
import { OrderItemInterface } from "./OrderItemInterface";
import { RestaurentInterface } from "./RestaurentInterface";
import { DefaultResponse } from "./StoreInterface";
import { UserInterface } from "./UserInterface";

export interface OrderInterface {
  _id: string;
  gst: number;
  grandTotal: number;
  subTotal: number;
  orderItems: OrderItemInterface[];
  restaurent: RestaurentInterface | string;
  customer: UserInterface | string;
  company: CompanyInterface | string;
}

export interface CreateOrderRequestPayload {
  cartId: string;
  payment: string;
}

export interface OrderStoreState {
  orderCreate: DefaultResponse;
}

export type OrderPayloadTypes =
  | OrderInterface
  | AxiosResponse
  | CreateOrderRequestPayload;

export type OrderAction = {
  type: "orders/create/data" | "orders/create/loading" | "orders/create/error";
  payload?: OrderPayloadTypes;
};
