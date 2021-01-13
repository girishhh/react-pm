import { AxiosResponse } from "axios";
import {
  RestaurentDetailsResp,
  RestaurentInterface,
  RestaurentListResp,
} from "../../interfaces/RestaurentInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { RestaurentConstants } from "../../utils/constants/RestaurentConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class RestaurentService {
  static async fetchRestaurentList(
    start: number,
    limit: number
  ): Promise<RestaurentListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      RestaurentConstants.RESTAURENT_LIST_API,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit })
      .build().getConfig;

    const result = await APIHelper.sendRequest<RestaurentListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as RestaurentListResp;
  }

  static async fetchRestaurentDetails(
    _id: string
  ): Promise<RestaurentDetailsResp> {
    const requestConfig = new APIParamsBuilderHelper(
      RestaurentConstants.RESTAURENT_DETAILS_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<RestaurentDetailsResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as RestaurentDetailsResp;
  }

  static async updateRestaurent(
    restaurent: RestaurentInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      RestaurentConstants.RESTAURENT_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: restaurent._id })
      .addRequestBody(restaurent)
      .build().getConfig;

    const result = await APIHelper.sendRequest<RestaurentInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async createRestaurent(
    restaurent: RestaurentInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      RestaurentConstants.RESTAURENT_LIST_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(restaurent)
      .build().getConfig;

    const result = await APIHelper.sendRequest<RestaurentInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteRestaurent(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      RestaurentConstants.RESTAURENT_UPDATE_API,
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

export default RestaurentService;
