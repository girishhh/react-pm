import * as H from "history";
import { Dispatch } from "react";
import {
  MenuItemAction,
  MenuItemDetailsPayload,
  MenuItemInterface,
  MenuItemListReqPayLoad,
} from "../../interfaces/MenuItemInterface";
import MenuItemService from "../../services/api/MenuItemService";

export function fetchMenuItemList(payload: MenuItemListReqPayLoad) {
  return async function fetchMenuItemListThunk(
    dispatch: Dispatch<MenuItemAction>
  ) {
    try {
      dispatch({ type: "menu-items/list/loading" });
      const data = await MenuItemService.fetchMenuItemList(
        payload.start,
        payload.limit,
        payload.conditions
      );
      dispatch({
        type: "menu-items/list/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "menu-items/list/error", payload: error });
    }
  };
}

export function fetchMenuItemDetails(payload: MenuItemDetailsPayload) {
  return async function fetchMenuItemDetailsThunk(
    dispatch: Dispatch<MenuItemAction>
  ) {
    try {
      dispatch({ type: "menu-items/details/loading" });
      const data = await MenuItemService.fetchMenuItemDetails(payload._id);
      dispatch({
        type: "menu-items/details/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "menu-items/details/error", payload: error });
    }
  };
}

export function updateMenuItem(
  payload: MenuItemInterface,
  history: H.History,
  successUrl: string
) {
  return async function updateMenuItemThunk(
    dispatch: Dispatch<MenuItemAction>
  ) {
    try {
      dispatch({ type: "menu-items/update/loading" });
      const data = await MenuItemService.updateMenuItem(payload);
      dispatch({ type: "menu-items/update/data" });
      if (data.status === 204) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "menu-items/update/error", payload: error });
    }
  };
}

export function createMenuItem(
  payload: MenuItemInterface,
  history: H.History,
  successUrl: string
) {
  return async function createMenuItemThunk(
    dispatch: Dispatch<MenuItemAction>
  ) {
    try {
      dispatch({ type: "menu-items/create/loading" });
      const data = await MenuItemService.createMenuItem(payload);
      dispatch({ type: "menu-items/create/data" });
      if (data.status === 201) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "menu-items/create/error", payload: error });
    }
  };
}

export function deleteMenuItem(_id: string, history: H.History) {
  return async function deleteMenuItemThunk(
    dispatch: Dispatch<MenuItemAction>
  ) {
    try {
      dispatch({ type: "menu-items/delete/loading" });
      const data = await MenuItemService.deleteMenuItem(_id);
      dispatch({ type: "menu-items/delete/data" });
      if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "menu-items/delete/error", payload: error });
    }
  };
}
