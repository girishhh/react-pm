import { AxiosResponse } from "axios";
import {
  AddressDetailsResp,
  AddressInterface,
  AddressListResp,
} from "../../interfaces/AddressInterface";
import { AddressConstants } from "../../utils/constants/AddressConstants";
import { HTTP_METHODS } from "../../utils/constants/common";
import APIHelper from "../../utils/helpers/APIHelper";
import APIParamsBuilderHelper from "../../utils/helpers/APIParamsBuilderHelper";

class AddressService {
  static async fetchAddressList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<AddressListResp> {
    const requestConfig = new APIParamsBuilderHelper(
      AddressConstants.ADDRESS_LIST_API,
      HTTP_METHODS.GET
    )
      .addQueryParams({ start, limit, conditions })
      .build().getConfig;

    const result = await APIHelper.sendRequest<AddressListResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as AddressListResp;
  }

  static async fetchAddressDetails(_id: string): Promise<AddressDetailsResp> {
    const requestConfig = new APIParamsBuilderHelper(
      AddressConstants.ADDRESS_DETAILS_API,
      HTTP_METHODS.GET
    )
      .addPathParams({ _id })
      .build().getConfig;

    const result = await APIHelper.sendRequest<AddressDetailsResp>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result?.data as AddressDetailsResp;
  }

  static async updateAddress(
    address: AddressInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      AddressConstants.ADDRESS_UPDATE_API,
      HTTP_METHODS.PUT
    )
      .addPathParams({ _id: address._id })
      .addRequestBody(address)
      .build().getConfig;

    const result = await APIHelper.sendRequest<AddressInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async createAddress(
    address: AddressInterface
  ): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      AddressConstants.ADDRESS_LIST_API,
      HTTP_METHODS.POST
    )
      .addRequestBody(address)
      .build().getConfig;

    const result = await APIHelper.sendRequest<AddressInterface>(
      requestConfig
    ).catch((err: string) => {
      throw err;
    });
    return result;
  }

  static async deleteAddress(_id: string): Promise<AxiosResponse> {
    const requestConfig = new APIParamsBuilderHelper(
      AddressConstants.ADDRESS_DELETE_API,
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

export default AddressService;
