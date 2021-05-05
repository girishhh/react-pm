import { AxiosResponse } from "axios";
import { CreateOrderRequestPayload } from "../../interfaces/OrderInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { OrderConstants } from "../../utils/constants/OrderConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class OrderService {
  static async createOrder(
    order: CreateOrderRequestPayload
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      OrderConstants.ORDER_CREATE_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(order)
      .build().getConfig;

    const result = await APIHelper.sendRequest<CreateOrderRequestPayload>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }
}

export default OrderService;
