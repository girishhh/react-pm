import { ActionType } from "../../interfaces/CommonInterface";
import { FoodItemStoreState } from "../../interfaces/FoodItemInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  foodItemList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodItemDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodItemUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodItemCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodItemDelete: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  indexedFoodItems: {},
};

const foodItemReducer = (
  state = initialState,
  action: ActionType
): FoodItemStoreState => {
  const { type, payload } = action;
  const {
    foodItemList,
    foodItemDetails,
    foodItemUpdate,
    foodItemCreate,
    foodItemDelete,
    indexedFoodItems,
  } = state;
  switch (type) {
    case "food-items/list/loading":
      foodItemList.state = API_STATE.LOADING;
      return { ...state, foodItemList };
    case "food-items/list/error":
      foodItemList.state = API_STATE.ERROR;
      foodItemList.error = payload;
      return { ...state, foodItemList };
    case "food-items/list/data":
      foodItemList.data = payload;
      foodItemList.state = API_STATE.DONE;
      return { ...state, foodItemList };

    case "food-items/details/loading":
      foodItemDetails.state = API_STATE.LOADING;
      return { ...state, foodItemDetails };
    case "food-items/details/error":
      foodItemDetails.state = API_STATE.ERROR;
      foodItemDetails.error = payload;
      return { ...state, foodItemDetails };
    case "food-items/details/data":
      foodItemDetails.data = payload;
      //@ts-ignore
      indexedFoodItems[payload?.foodItemDetails?._id] =
        payload?.foodItemDetails;
      foodItemDetails.state = API_STATE.DONE;
      return { ...state, foodItemDetails, indexedFoodItems };

    case "food-items/update/loading":
      foodItemUpdate.state = API_STATE.LOADING;
      return { ...state, foodItemUpdate };
    case "food-items/update/error":
      foodItemUpdate.state = API_STATE.ERROR;
      foodItemUpdate.error = payload;
      return { ...state, foodItemUpdate };
    case "food-items/update/data":
      foodItemUpdate.state = API_STATE.DONE;
      return { ...state, foodItemUpdate };

    case "food-items/create/loading":
      foodItemCreate.state = API_STATE.LOADING;
      return { ...state, foodItemCreate };
    case "food-items/create/error":
      foodItemCreate.state = API_STATE.ERROR;
      foodItemCreate.error = payload;
      return { ...state, foodItemCreate };
    case "food-items/create/data":
      foodItemCreate.state = API_STATE.DONE;
      return { ...state, foodItemCreate };

    case "food-items/delete/loading":
      foodItemDelete.state = API_STATE.LOADING;
      return { ...state, foodItemDelete };
    case "food-items/delete/error":
      foodItemDelete.state = API_STATE.ERROR;
      foodItemDelete.error = payload;
      return { ...state, foodItemDelete };
    case "food-items/delete/data":
      foodItemDelete.state = API_STATE.DONE;
      return { ...state, foodItemDelete };
    default:
      return state;
  }
};

export { foodItemReducer };
