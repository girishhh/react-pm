import { Dispatch } from "react";
import * as H from "history";
import {
  CreateOrderRequestPayload,
  OrderAction,
} from "../../interfaces/OrderInterface";
import OrderService from "../../services/api/OrderService";

export function createOrder(
  payload: CreateOrderRequestPayload,
  history: H.History
) {
  return async function createOrderThunk(dispatch: Dispatch<OrderAction>) {
    try {
      dispatch({ type: "orders/create/loading" });
      const data = await OrderService.createOrder(payload);
      if (data.status === 201) history.push("/orders");
      dispatch({ type: "orders/create/data" });
    } catch (error) {
      dispatch({ type: "orders/create/error", payload: error });
    }
  };
}
