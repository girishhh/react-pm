import { CompanyInterface } from "./CompanyInterface";
import { MenuInterface } from "./MenuInterface";
import { RestaurentInterface } from "./RestaurentInterface";
import { AxiosResponse } from "axios";
import { FoodCategoryInterface } from "./FoodCategoryInterface";
import { DefaultResponse } from "./StoreInterface";

export interface MenuItemInterface {
  _id: string;
  name: string;
  menus: MenuInterface[];
  categories: FoodCategoryInterface[];
  restaurent: RestaurentInterface;
  company: CompanyInterface;
}

export interface MenuItemStoreState {
  menuItemList: DefaultResponse;
  menuItemDetails: DefaultResponse;
  menuItemUpdate: DefaultResponse;
  menuItemCreate: DefaultResponse;
  menuItemDelete: DefaultResponse;
}

export interface MenuItemListReqPayLoad {
  start: number;
  limit: number;
  conditions: string;
}

export interface MenuItemDetailsPayload {
  _id: string;
}

export interface MenuItemDetailsResp {
  menuItemDetails: MenuItemInterface;
}

export interface MenuItemListResp {
  total: number;
  menuItemList: MenuItemInterface[];
}

export type MenuItemPayloadTypes =
  | MenuItemListReqPayLoad
  | MenuItemListResp
  | MenuItemDetailsPayload
  | MenuItemDetailsResp
  | MenuItemInterface
  | AxiosResponse;

export type MenuItemAction = {
  type:
    | "menu-items/list/data"
    | "menu-items/list/loading"
    | "menu-items/list/error"
    | "menu-items/details/data"
    | "menu-items/details/loading"
    | "menu-items/details/error"
    | "menu-items/update/data"
    | "menu-items/update/loading"
    | "menu-items/update/error"
    | "menu-items/create/data"
    | "menu-items/create/loading"
    | "menu-items/create/error"
    | "menu-items/delete/data"
    | "menu-items/delete/loading"
    | "menu-items/delete/error";
  payload?: MenuItemPayloadTypes;
};
