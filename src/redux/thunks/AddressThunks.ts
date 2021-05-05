import * as H from "history";
import { Dispatch } from "react";
import {
  AddressAction,
  AddressDetailsPayload,
  AddressInterface,
  AddressListReqPayLoad,
} from "../../interfaces/AddressInterface";
import AddressService from "../../services/api/AddressService";

export function fetchAddressList(payload: AddressListReqPayLoad) {
  return async function fetchAddressListThunk(
    dispatch: Dispatch<AddressAction>
  ) {
    try {
      dispatch({ type: "addresss/list/loading" });
      const data = await AddressService.fetchAddressList(
        payload.start,
        payload.limit,
        payload.conditions
      );
      dispatch({
        type: "addresss/list/data",
        payload: data,
      });
      return data?.addressList;
    } catch (error) {
      dispatch({ type: "addresss/list/error", payload: error });
    }
  };
}

export function fetchAddressDetails(payload: AddressDetailsPayload) {
  return async function fetchAddressDetailsThunk(
    dispatch: Dispatch<AddressAction>
  ) {
    try {
      dispatch({ type: "addresss/details/loading" });
      const data = await AddressService.fetchAddressDetails(payload._id);
      dispatch({
        type: "addresss/details/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "addresss/details/error", payload: error });
    }
  };
}

export function updateAddress(
  payload: AddressInterface,
  history: H.History,
  successUrl: string
) {
  return async function updateAddressThunk(dispatch: Dispatch<AddressAction>) {
    try {
      dispatch({ type: "addresss/update/loading" });
      const data = await AddressService.updateAddress(payload);
      dispatch({ type: "addresss/update/data" });
      if (data.status === 204) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "addresss/update/error", payload: error });
    }
  };
}

export function createAddress(
  payload: AddressInterface,
  history: H.History,
  successUrl: string
) {
  return async function createAddressThunk(dispatch: Dispatch<AddressAction>) {
    try {
      dispatch({ type: "addresss/create/loading" });
      const data = await AddressService.createAddress(payload);
      dispatch({ type: "addresss/create/data" });
      if (data.status === 201) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "addresss/create/error", payload: error });
    }
  };
}

export function deleteAddress(_id: string, history: H.History) {
  return async function deleteAddressThunk(dispatch: Dispatch<AddressAction>) {
    try {
      dispatch({ type: "addresss/delete/loading" });
      const data = await AddressService.deleteAddress(_id);
      dispatch({ type: "addresss/delete/data" });
      if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "addresss/delete/error", payload: error });
    }
  };
}
