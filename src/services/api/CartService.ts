import { AxiosResponse } from "axios";
import { CartInterface } from "../../interfaces/CartInterface";
import { CartConstants } from "../../utils/constants/CartConstants";
import { HTTP_METHODS } from "../../utils/constants/common";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class CartService {
  static async fetchCartDetails(_id: string): Promise<CartInterface> {
    const requestConfig = new APIParamsBuilderHelper(
      CartConstants.CART_GET_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<CartInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as CartInterface;
  }

  static async updateCart(cart: CartInterface): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CartConstants.CART_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: cart._id })
      .addRequestBody(cart)
      .build().getConfig;

    const result = await APIHelper.sendRequest<CartInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }
}

export default CartService;
