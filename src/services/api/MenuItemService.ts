import { AxiosResponse } from "axios";
import {
  MenuItemDetailsResp,
  MenuItemInterface,
  MenuItemListResp,
} from "../../interfaces/MenuItemInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { MenuItemConstants } from "../../utils/constants/MenuItemConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class MenuItemService {
  static async fetchMenuItemList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<MenuItemListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuItemConstants.MENU_ITEM_LIST_API,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit, conditions })
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuItemListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as MenuItemListResp;
  }

  static async fetchMenuItemDetails(_id: string): Promise<MenuItemDetailsResp> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuItemConstants.MENU_ITEM_DETAILS_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuItemDetailsResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as MenuItemDetailsResp;
  }

  static async updateMenuItem(
    menuItem: MenuItemInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuItemConstants.MENU_ITEM_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: menuItem._id })
      .addRequestBody(menuItem)
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuItemInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async createMenuItem(
    menuItem: MenuItemInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuItemConstants.MENU_ITEM_LIST_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(menuItem)
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuItemInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteMenuItem(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuItemConstants.MENU_ITEM_DETAILS_API,
      HTTP_METHODS.DELETE
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest(requestConfig).catch(
      (err: string) => {
        throw err;
      }
    );
    return result;
  }
}

export default MenuItemService;
