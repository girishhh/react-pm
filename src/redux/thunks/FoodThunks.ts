import * as H from "history";
import { Dispatch } from "react";
import {
  FoodCategoryAction,
  FoodCategoryDetailsPayload,
  FoodCategoryInterface,
  FoodCategoryListReqPayLoad,
} from "../../interfaces/FoodCategoryInterface";
import FoodCategoryService from "../../services/api/FoodCategoryService";

export function fetchFoodCategoryList(payload: FoodCategoryListReqPayLoad) {
  return async function fetchFoodCategoryListThunk(
    dispatch: Dispatch<FoodCategoryAction>
  ) {
    try {
      dispatch({ type: "food-categories/list/loading" });
      const data = await FoodCategoryService.fetchFoodCategoryList(
        payload.start,
        payload.limit
      );
      dispatch({
        type: "food-categories/list/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "food-categories/list/error", payload: error });
    }
  };
}

export function fetchFoodCategoryDetails(payload: FoodCategoryDetailsPayload) {
  return async function fetchFoodCategoryDetailsThunk(
    dispatch: Dispatch<FoodCategoryAction>
  ) {
    try {
      dispatch({ type: "food-categories/details/loading" });
      const data = await FoodCategoryService.fetchFoodCategoryDetails(
        payload._id
      );
      dispatch({
        type: "food-categories/details/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "food-categories/details/error", payload: error });
    }
  };
}

export function updateFoodCategory(
  payload: FoodCategoryInterface,
  history: H.History
) {
  return async function updateFoodCategoryThunk(
    dispatch: Dispatch<FoodCategoryAction>
  ) {
    try {
      dispatch({ type: "food-categories/update/loading" });
      const data = await FoodCategoryService.updateFoodCategory(payload);
      dispatch({ type: "food-categories/update/data" });
      if (data.status === 204) history.push("/food-categories");
    } catch (error) {
      dispatch({ type: "food-categories/update/error", payload: error });
    }
  };
}

export function createFoodCategory(
  payload: FoodCategoryInterface,
  history: H.History
) {
  return async function createFoodCategoryThunk(
    dispatch: Dispatch<FoodCategoryAction>
  ) {
    try {
      dispatch({ type: "food-categories/create/loading" });
      const data = await FoodCategoryService.createFoodCategory(payload);
      dispatch({ type: "food-categories/create/data" });
      if (data.status === 201) history.push("/food-categories");
    } catch (error) {
      dispatch({ type: "food-categories/create/error", payload: error });
    }
  };
}

export function deleteFoodCategory(_id: string, history: H.History) {
  return async function deleteFoodCategoryThunk(
    dispatch: Dispatch<FoodCategoryAction>
  ) {
    try {
      dispatch({ type: "food-categories/delete/loading" });
      const data = await FoodCategoryService.deleteFoodCategory(_id);
      dispatch({ type: "food-categories/delete/data" });
      if (data.status === 204) history.go(0);
    } catch (error) {
      dispatch({ type: "food-categories/delete/error", payload: error });
    }
  };
}
