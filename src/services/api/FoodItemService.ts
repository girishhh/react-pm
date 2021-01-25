import { AxiosResponse } from "axios";
import {
  FoodItemDetailsResp,
  FoodItemInterface,
  FoodItemListResp,
} from "../../interfaces/FoodItemInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { FoodItemConstants } from "../../utils/constants/FoodItemConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class FoodItemService {
  static async fetchFoodItemList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<FoodItemListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodItemConstants.FOOD_ITEM_LIST_API,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit, conditions })
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodItemListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as FoodItemListResp;
  }

  static async fetchFoodItemDetails(_id: string): Promise<FoodItemDetailsResp> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodItemConstants.FOOD_ITEM_DETAILS_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodItemDetailsResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as FoodItemDetailsResp;
  }

  static async updateFoodItem(
    foodItem: FoodItemInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodItemConstants.FOOD_ITEM_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: foodItem._id })
      .addRequestBody(foodItem)
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodItemInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async createFoodItem(
    foodItem: FoodItemInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodItemConstants.FOOD_ITEM_LIST_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(foodItem)
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodItemInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteFoodItem(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodItemConstants.FOOD_ITEM_DETAILS_API,
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

export default FoodItemService;
