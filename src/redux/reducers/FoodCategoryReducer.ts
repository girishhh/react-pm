import { ActionType } from "../../interfaces/CommonInterface";
import { CompanyStoreState } from "../../interfaces/CompanyInterface";
import { FoodCategoryStoreState } from "../../interfaces/FoodCategoryInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  foodCategoryList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodCategoryDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodCategoryUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodCategoryCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  foodCategoryDelete: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const foodCategoryReducer = (
  state = initialState,
  action: ActionType
): FoodCategoryStoreState => {
  const { type, payload } = action;
  const {
    foodCategoryList,
    foodCategoryDetails,
    foodCategoryUpdate,
    foodCategoryCreate,
    foodCategoryDelete,
  } = state;
  switch (type) {
    case "food-categories/list/loading":
      foodCategoryList.state = API_STATE.LOADING;
      return { ...state, foodCategoryList };
    case "food-categories/list/error":
      foodCategoryList.state = API_STATE.ERROR;
      foodCategoryList.error = payload;
      return { ...state, foodCategoryList };
    case "food-categories/list/data":
      foodCategoryList.data = payload;
      foodCategoryList.state = API_STATE.DONE;
      return { ...state, foodCategoryList };

    case "food-categories/details/loading":
      foodCategoryDetails.state = API_STATE.LOADING;
      return { ...state, foodCategoryDetails };
    case "food-categories/details/error":
      foodCategoryDetails.state = API_STATE.ERROR;
      foodCategoryDetails.error = payload;
      return { ...state, foodCategoryDetails };
    case "food-categories/details/data":
      foodCategoryDetails.data = payload;
      foodCategoryDetails.state = API_STATE.DONE;
      return { ...state, foodCategoryDetails };

    case "food-categories/update/loading":
      foodCategoryUpdate.state = API_STATE.LOADING;
      return { ...state, foodCategoryUpdate };
    case "food-categories/update/error":
      foodCategoryUpdate.state = API_STATE.ERROR;
      foodCategoryUpdate.error = payload;
      return { ...state, foodCategoryUpdate };
    case "food-categories/update/data":
      foodCategoryUpdate.state = API_STATE.DONE;
      return { ...state, foodCategoryUpdate };

    case "food-categories/create/loading":
      foodCategoryCreate.state = API_STATE.LOADING;
      return { ...state, foodCategoryCreate };
    case "food-categories/create/error":
      foodCategoryCreate.state = API_STATE.ERROR;
      foodCategoryCreate.error = payload;
      return { ...state, foodCategoryCreate };
    case "food-categories/create/data":
      foodCategoryCreate.state = API_STATE.DONE;
      return { ...state, foodCategoryCreate };

    case "food-categories/delete/loading":
      foodCategoryDelete.state = API_STATE.LOADING;
      return { ...state, foodCategoryDelete };
    case "food-categories/delete/error":
      foodCategoryDelete.state = API_STATE.ERROR;
      foodCategoryDelete.error = payload;
      return { ...state, foodCategoryDelete };
    case "food-categories/delete/data":
      foodCategoryDelete.state = API_STATE.DONE;
      return { ...state, foodCategoryDelete };
    default:
      return state;
  }
};

export { foodCategoryReducer };
