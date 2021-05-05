import { Dispatch } from "react";
import { CartAction, CartInterface } from "../../interfaces/CartInterface";
import CartService from "../../services/api/CartService";

export function updateCart(cart: CartInterface) {
  return async function updateCartThunk(dispatch: Dispatch<CartAction>) {
    try {
      dispatch({ type: "carts/update/loading" });
      const response = await CartService.updateCart(cart);
      dispatch({ type: "carts/update/data" });
    } catch (error) {
      dispatch({ type: "carts/update/error", payload: error });
    }
  };
}

export function fetchCartDetails(_id: string) {
  return async function fetchCartDetailsThunk(dispatch: Dispatch<CartAction>) {
    try {
      dispatch({ type: "carts/details/loading" });
      const response = await CartService.fetchCartDetails(_id);
      dispatch({ type: "carts/details/data", payload: response });
    } catch (error) {
      dispatch({ type: "carts/details/error", payload: error });
    }
  };
}
