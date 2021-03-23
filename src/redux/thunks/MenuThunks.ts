import * as H from "history";
import { Dispatch } from "react";
import {
  MenuAction,
  MenuDetailsPayload,
  MenuInterface,
  MenuListReqPayLoad,
} from "../../interfaces/MenuInterface";
import MenuService from "../../services/api/MenuService";

export function fetchMenuList(payload: MenuListReqPayLoad) {
  return async function fetchMenuListThunk(dispatch: Dispatch<MenuAction>) {
    try {
      dispatch({ type: "menus/list/loading" });
      const data = await MenuService.fetchMenuList(
        payload.start,
        payload.limit,
        payload.conditions
      );
      dispatch({
        type: "menus/list/data",
        payload: data,
      });
      return data?.menuList;
    } catch (error) {
      dispatch({ type: "menus/list/error", payload: error });
    }
  };
}

export function fetchMenuDetails(payload: MenuDetailsPayload) {
  return async function fetchMenuDetailsThunk(dispatch: Dispatch<MenuAction>) {
    try {
      dispatch({ type: "menus/details/loading" });
      const data = await MenuService.fetchMenuDetails(payload._id);
      dispatch({
        type: "menus/details/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "menus/details/error", payload: error });
    }
  };
}

export function updateMenu(
  payload: MenuInterface,
  history: H.History,
  successUrl: string
) {
  return async function updateMenuThunk(dispatch: Dispatch<MenuAction>) {
    try {
      dispatch({ type: "menus/update/loading" });
      const data = await MenuService.updateMenu(payload);
      dispatch({ type: "menus/update/data" });
      if (data.status === 204) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "menus/update/error", payload: error });
    }
  };
}

export function createMenu(
  payload: MenuInterface,
  history: H.History,
  successUrl: string
) {
  return async function createMenuThunk(dispatch: Dispatch<MenuAction>) {
    try {
      dispatch({ type: "menus/create/loading" });
      const data = await MenuService.createMenu(payload);
      dispatch({ type: "menus/create/data" });
      if (data.status === 201) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "menus/create/error", payload: error });
    }
  };
}

export function deleteMenu(_id: string, history: H.History) {
  return async function deleteMenuThunk(dispatch: Dispatch<MenuAction>) {
    try {
      dispatch({ type: "menus/delete/loading" });
      const data = await MenuService.deleteMenu(_id);
      dispatch({ type: "menus/delete/data" });
      if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "menus/delete/error", payload: error });
    }
  };
}

export function activateMenu(_id: string, history: H.History) {
  return async function activateMenuThunk(dispatch: Dispatch<MenuAction>) {
    try {
      dispatch({ type: "menus/activate/loading" });
      const data = await MenuService.activateMenu(_id);
      dispatch({ type: "menus/activate/data" });
      if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "menus/activate/error", payload: error });
    }
  };
}
