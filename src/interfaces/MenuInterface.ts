import { AxiosResponse } from "axios";
import { MenuItemInterface } from "./MenuItemInterface";
import { DefaultResponse } from "./StoreInterface";

export interface MenuInterface {
  _id: string;
  name: string;
  menuItems: MenuItemInterface[];
}

export interface MenuStoreState {
  menuList: DefaultResponse;
  menuDetails: DefaultResponse;
  menuUpdate: DefaultResponse;
  menuCreate: DefaultResponse;
  menuDelete: DefaultResponse;
}

export interface MenuListReqPayLoad {
  start: number;
  limit: number;
  conditions: string;
}

export interface MenuDetailsPayload {
  _id: string;
}

export interface MenuDetailsResp {
  menuDetails: MenuInterface;
}

export interface MenuListResp {
  total: number;
  menuList: MenuInterface[];
}

export type MenuPayloadTypes =
  | MenuListReqPayLoad
  | MenuListResp
  | MenuDetailsPayload
  | MenuDetailsResp
  | MenuInterface
  | AxiosResponse;

export type MenuAction = {
  type:
    | "menus/list/data"
    | "menus/list/loading"
    | "menus/list/error"
    | "menus/details/data"
    | "menus/details/loading"
    | "menus/details/error"
    | "menus/update/data"
    | "menus/update/loading"
    | "menus/update/error"
    | "menus/create/data"
    | "menus/create/loading"
    | "menus/create/error"
    | "menus/delete/data"
    | "menus/delete/loading"
    | "menus/delete/error";
  payload?: MenuPayloadTypes;
};
