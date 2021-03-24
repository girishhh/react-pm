import { AxiosResponse } from "axios";
import {
  MenuDetailsResp,
  MenuInterface,
  MenuListResp,
} from "../../interfaces/MenuInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { MenuConstants } from "../../utils/constants/MenuConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class MenuService {
  static async fetchMenuList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<MenuListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuConstants.MENU_LIST_API,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit, conditions })
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as MenuListResp;
  }

  static async fetchMenuDetails(_id: string): Promise<MenuDetailsResp> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuConstants.MENU_DETAILS_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuDetailsResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as MenuDetailsResp;
  }

  static async updateMenu(menu: MenuInterface): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuConstants.MENU_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: menu._id })
      .addRequestBody(menu)
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async createMenu(menu: MenuInterface): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuConstants.MENU_LIST_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(menu)
      .build().getConfig;

    const result = await APIHelper.sendRequest<MenuInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteMenu(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuConstants.MENU_DETAILS_API,
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

  static async activateMenu(
    _id: string,
    restaurentId: string
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      MenuConstants.MENU_ACTIVATE,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id })
      .addRequestBody({ restaurentId })
      .build().getConfig;

    const result = await APIHelper.sendRequest(requestConfig).catch(
      (err: string) => {
        throw err;
      }
    );
    return result;
  }
}

export default MenuService;
