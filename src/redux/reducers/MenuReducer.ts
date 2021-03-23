import { ActionType } from "../../interfaces/CommonInterface";
import { MenuStoreState } from "../../interfaces/MenuInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  menuList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuDelete: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuActivate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const menuReducer = (
  state = initialState,
  action: ActionType
): MenuStoreState => {
  const { type, payload } = action;
  const {
    menuList,
    menuDetails,
    menuUpdate,
    menuCreate,
    menuDelete,
    menuActivate,
  } = state;
  switch (type) {
    case "menus/list/loading":
      menuList.state = API_STATE.LOADING;
      return { ...state, menuList };
    case "menus/list/error":
      menuList.state = API_STATE.ERROR;
      menuList.error = payload;
      return { ...state, menuList };
    case "menus/list/data":
      menuList.data = payload;
      menuList.state = API_STATE.DONE;
      return { ...state, menuList };

    case "menus/details/loading":
      menuDetails.state = API_STATE.LOADING;
      return { ...state, menuDetails };
    case "menus/details/error":
      menuDetails.state = API_STATE.ERROR;
      menuDetails.error = payload;
      return { ...state, menuDetails };
    case "menus/details/data":
      menuDetails.data = payload;
      menuDetails.state = API_STATE.DONE;
      return { ...state, menuDetails };

    case "menus/update/loading":
      menuUpdate.state = API_STATE.LOADING;
      return { ...state, menuUpdate };
    case "menus/update/error":
      menuUpdate.state = API_STATE.ERROR;
      menuUpdate.error = payload;
      return { ...state, menuUpdate };
    case "menus/update/data":
      menuUpdate.state = API_STATE.DONE;
      return { ...state, menuUpdate };

    case "menus/create/loading":
      menuCreate.state = API_STATE.LOADING;
      return { ...state, menuCreate };
    case "menus/create/error":
      menuCreate.state = API_STATE.ERROR;
      menuCreate.error = payload;
      return { ...state, menuCreate };
    case "menus/create/data":
      menuCreate.state = API_STATE.DONE;
      return { ...state, menuCreate };

    case "menus/delete/loading":
      menuDelete.state = API_STATE.LOADING;
      return { ...state, menuDelete };
    case "menus/delete/error":
      menuDelete.state = API_STATE.ERROR;
      menuDelete.error = payload;
      return { ...state, menuDelete };
    case "menus/delete/data":
      menuDelete.state = API_STATE.DONE;
      return { ...state, menuDelete };

    case "menus/activate/loading":
      menuActivate.state = API_STATE.LOADING;
      return { ...state, menuActivate };
    case "menus/activate/error":
      menuActivate.state = API_STATE.ERROR;
      menuActivate.error = payload;
      return { ...state, menuActivate };
    case "menus/activate/data":
      menuActivate.state = API_STATE.DONE;
      return { ...state, menuActivate };
    default:
      return state;
  }
};

export { menuReducer };
