import { Dispatch } from "react";
import {
  CartItemAction,
  CartItemInterface,
  CreateCartItemRequestInterface,
} from "../../interfaces/CartItemInterface";
import CartItemService from "../../services/api/CartItemService";

export function createCartItem(cartItem: CreateCartItemRequestInterface) {
  return async function createCartItemThunk(
    dispatch: Dispatch<CartItemAction>
  ) {
    try {
      dispatch({ type: "cart-items/create/loading" });
      const response = await CartItemService.createCartItem(cartItem);
      dispatch({ type: "cart-items/create/data" });
      return response;
    } catch (error) {
      dispatch({ type: "cart-items/create/error", payload: error });
    }
  };
}

export function updateCartItem(cartItem: CartItemInterface) {
  return async function updateCartItemThunk(
    dispatch: Dispatch<CartItemAction>
  ) {
    try {
      dispatch({ type: "cart-items/update/loading" });
      const response = await CartItemService.updateCartItem(cartItem);
      dispatch({ type: "cart-items/update/data" });
      return response;
    } catch (error) {
      dispatch({ type: "cart-items/update/error", payload: error });
    }
  };
}

export function refreshCart(payload: CartItemInterface) {
  return async function createCartItemThunk(
    dispatch: Dispatch<CartItemAction>
  ) {
    try {
      dispatch({ type: "cart-items/refreshCart/loading" });
      const data = await CartItemService.createCartItem(payload);
      dispatch({ type: "cart-items/refreshCart/data" });
      // if (data.status === 201) history.go(0);
    } catch (error) {
      dispatch({ type: "cart-items/refreshCart/error", payload: error });
    }
  };
}

export function deleteCartItem(_id: string) {
  return async function deleteCartItemThunk(
    dispatch: Dispatch<CartItemAction>
  ) {
    try {
      dispatch({ type: "cart-items/delete/loading" });
      const response = await CartItemService.deleteCartItem(_id);
      dispatch({ type: "cart-items/delete/data" });
      return response;
      // if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "cart-items/delete/error", payload: error });
    }
  };
}
