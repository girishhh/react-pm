import * as H from "history";
import { Dispatch } from "react";
import {
  FoodItemAction,
  FoodItemDetailsPayload,
  FoodItemInterface,
  FoodItemListReqPayLoad,
} from "../../interfaces/FoodItemInterface";
import FoodItemService from "../../services/api/FoodItemService";

export function fetchFoodItemList(payload: FoodItemListReqPayLoad) {
  return async function fetchFoodItemListThunk(
    dispatch: Dispatch<FoodItemAction>
  ) {
    try {
      dispatch({ type: "food-items/list/loading" });
      const data = await FoodItemService.fetchFoodItemList(
        payload.start,
        payload.limit,
        payload.conditions
      );
      dispatch({
        type: "food-items/list/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "food-items/list/error", payload: error });
    }
  };
}

export function fetchFoodItemDetails(payload: FoodItemDetailsPayload) {
  return async function fetchFoodItemDetailsThunk(
    dispatch: Dispatch<FoodItemAction>
  ) {
    try {
      dispatch({ type: "food-items/details/loading" });
      const data = await FoodItemService.fetchFoodItemDetails(payload._id);
      dispatch({
        type: "food-items/details/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "food-items/details/error", payload: error });
    }
  };
}

export function updateFoodItem(
  payload: FoodItemInterface,
  history: H.History,
  successUrl: string
) {
  return async function updateFoodItemThunk(
    dispatch: Dispatch<FoodItemAction>
  ) {
    try {
      dispatch({ type: "food-items/update/loading" });
      const data = await FoodItemService.updateFoodItem(payload);
      dispatch({ type: "food-items/update/data" });
      if (data.status === 204) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "food-items/update/error", payload: error });
    }
  };
}

export function createFoodItem(
  payload: FoodItemInterface,
  history: H.History,
  successUrl: string
) {
  return async function createFoodItemThunk(
    dispatch: Dispatch<FoodItemAction>
  ) {
    try {
      dispatch({ type: "food-items/create/loading" });
      const data = await FoodItemService.createFoodItem(payload);
      dispatch({ type: "food-items/create/data" });
      if (data.status === 201) history.push(successUrl);
    } catch (error) {
      dispatch({ type: "food-items/create/error", payload: error });
    }
  };
}

export function deleteFoodItem(_id: string, history: H.History) {
  return async function deleteFoodItemThunk(
    dispatch: Dispatch<FoodItemAction>
  ) {
    try {
      dispatch({ type: "food-items/delete/loading" });
      const data = await FoodItemService.deleteFoodItem(_id);
      dispatch({ type: "food-items/delete/data" });
      if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "food-items/delete/error", payload: error });
    }
  };
}
