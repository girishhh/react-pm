import { AxiosResponse } from "axios";
import {
  FoodCategoryDetailsResp,
  FoodCategoryInterface,
  FoodCategoryListResp,
} from "../../interfaces/FoodCategoryInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { FoodCategoryConstants } from "../../utils/constants/FoodCategoryConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class FoodCategoryService {
  static async fetchFoodCategoryList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<FoodCategoryListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodCategoryConstants.FOOD_CATEGORY_LIST_API,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit, conditions })
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodCategoryListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as FoodCategoryListResp;
  }

  static async fetchFoodCategoryDetails(
    _id: string
  ): Promise<FoodCategoryDetailsResp> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodCategoryConstants.FOOD_CATEGORY_DETAILS_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodCategoryDetailsResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as FoodCategoryDetailsResp;
  }

  static async updateFoodCategory(
    company: FoodCategoryInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodCategoryConstants.FOOD_CATEGORY_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: company._id })
      .addRequestBody(company)
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodCategoryInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async createFoodCategory(
    company: FoodCategoryInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodCategoryConstants.FOOD_CATEGORY_LIST_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(company)
      .build().getConfig;

    const result = await APIHelper.sendRequest<FoodCategoryInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteFoodCategory(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      FoodCategoryConstants.FOOD_CATEGORY_DETAILS_API,
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

export default FoodCategoryService;
