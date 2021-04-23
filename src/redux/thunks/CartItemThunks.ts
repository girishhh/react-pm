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
      return error;
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

export function refreshCart(payload: CreateCartItemRequestInterface) {
  return async function createCartItemThunk(
    dispatch: Dispatch<CartItemAction>
  ) {
    try {
      dispatch({ type: "cart-items/refreshCart/loading" });
      const response = await CartItemService.refreshCart(payload);
      dispatch({ type: "cart-items/refreshCart/data" });
      return response;
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
    } catch (error) {
      dispatch({ type: "cart-items/delete/error", payload: error });
    }
  };
}
