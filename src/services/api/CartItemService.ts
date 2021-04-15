import { AxiosResponse } from "axios";
import { CartItemInterface } from "../../interfaces/CartItemInterface";
import { HTTP_METHODS } from "../../utils/constants/common";
import { CartItemConstants } from "../../utils/constants/CartItemConstants";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class CartItemService {
  static async createCartItem(
    cartItem: CartItemInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CartItemConstants.CART_ITEM_CREATE_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(cartItem)
      .build().getConfig;

    const result = await APIHelper.sendRequest<CartItemInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async updateCartItem(
    cartItem: CartItemInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CartItemConstants.CART_ITEM_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: cartItem._id })
      .addRequestBody(cartItem)
      .build().getConfig;

    const result = await APIHelper.sendRequest<CartItemInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async refreshCart(
    cartItem: CartItemInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CartItemConstants.CART_ITEM_REFRESH_CART_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(cartItem)
      .build().getConfig;

    const result = await APIHelper.sendRequest<CartItemInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteCartItem(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      CartItemConstants.CART_ITEM_DELETE_API,
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

export default CartItemService;
