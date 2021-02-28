import * as H from "history";
import { Dispatch } from "react";
import {
  RestaurentAction,
  RestaurentDetailsPayload,
  RestaurentInterface,
  RestaurentListReqPayLoad,
} from "../../interfaces/RestaurentInterface";
import RestaurentService from "../../services/api/RestaurentService";

export function fetchRestaurentList(payload: RestaurentListReqPayLoad) {
  return async function fetchRestaurentListThunk(
    dispatch: Dispatch<RestaurentAction>
  ) {
    try {
      dispatch({ type: "restaurents/list/loading" });
      const data = await RestaurentService.fetchRestaurentList(
        payload.start,
        payload.limit,
        payload.conditions
      );
      dispatch({
        type: "restaurents/list/data",
        payload: data,
      });
      return data?.restaurentList;
    } catch (error) {
      dispatch({ type: "restaurents/list/error", payload: error });
    }
  };
}

export function fetchRestaurentDetails(payload: RestaurentDetailsPayload) {
  return async function fetchRestaurentDetailsThunk(
    dispatch: Dispatch<RestaurentAction>
  ) {
    try {
      dispatch({ type: "restaurents/details/loading" });
      dispatch({ type: "restaurents/details/reset" });
      const data = await RestaurentService.fetchRestaurentDetails(payload._id);
      dispatch({
        type: "restaurents/details/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "restaurents/details/error", payload: error });
    }
  };
}

export function updateRestaurent(
  payload: RestaurentInterface,
  history: H.History
) {
  return async function updateRestaurentThunk(
    dispatch: Dispatch<RestaurentAction>
  ) {
    try {
      dispatch({ type: "restaurents/update/loading" });
      const data = await RestaurentService.updateRestaurent(payload);
      dispatch({ type: "restaurents/update/data" });
      if (data.status === 204) history.push("/restaurents");
    } catch (error) {
      dispatch({ type: "restaurents/update/error", payload: error });
    }
  };
}

export function createRestaurent(
  payload: RestaurentInterface,
  history: H.History
) {
  return async function createRestaurentThunk(
    dispatch: Dispatch<RestaurentAction>
  ) {
    try {
      dispatch({ type: "restaurents/create/loading" });
      const data = await RestaurentService.createRestaurent(payload);
      dispatch({ type: "restaurents/create/data" });
      if (data.status === 201) history.push("/restaurents");
    } catch (error) {
      dispatch({ type: "restaurents/create/error", payload: error });
    }
  };
}

export function deleteRestaurent(_id: string, history: H.History) {
  return async function deleteRestaurentThunk(
    dispatch: Dispatch<RestaurentAction>
  ) {
    try {
      dispatch({ type: "restaurents/delete/loading" });
      const data = await RestaurentService.deleteRestaurent(_id);
      dispatch({ type: "restaurents/delete/data" });
      if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "restaurents/delete/error", payload: error });
    }
  };
}
