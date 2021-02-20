import { ActionType } from "../../interfaces/CommonInterface";
import { MenuItemStoreState } from "../../interfaces/MenuItemInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  menuItemList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuItemDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuItemUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuItemCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  menuItemDelete: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const menuItemReducer = (
  state = initialState,
  action: ActionType
): MenuItemStoreState => {
  const { type, payload } = action;
  const {
    menuItemList,
    menuItemDetails,
    menuItemUpdate,
    menuItemCreate,
    menuItemDelete,
  } = state;
  switch (type) {
    case "menu-items/list/loading":
      menuItemList.state = API_STATE.LOADING;
      return { ...state, menuItemList };
    case "menu-items/list/error":
      menuItemList.state = API_STATE.ERROR;
      menuItemList.error = payload;
      return { ...state, menuItemList };
    case "menu-items/list/data":
      menuItemList.data = payload;
      menuItemList.state = API_STATE.DONE;
      return { ...state, menuItemList };

    case "menu-items/details/loading":
      menuItemDetails.state = API_STATE.LOADING;
      return { ...state, menuItemDetails };
    case "menu-items/details/error":
      menuItemDetails.state = API_STATE.ERROR;
      menuItemDetails.error = payload;
      return { ...state, menuItemDetails };
    case "menu-items/details/data":
      menuItemDetails.data = payload;
      menuItemDetails.state = API_STATE.DONE;
      return { ...state, menuItemDetails };

    case "menu-items/update/loading":
      menuItemUpdate.state = API_STATE.LOADING;
      return { ...state, menuItemUpdate };
    case "menu-items/update/error":
      menuItemUpdate.state = API_STATE.ERROR;
      menuItemUpdate.error = payload;
      return { ...state, menuItemUpdate };
    case "menu-items/update/data":
      menuItemUpdate.state = API_STATE.DONE;
      return { ...state, menuItemUpdate };

    case "menu-items/create/loading":
      menuItemCreate.state = API_STATE.LOADING;
      return { ...state, menuItemCreate };
    case "menu-items/create/error":
      menuItemCreate.state = API_STATE.ERROR;
      menuItemCreate.error = payload;
      return { ...state, menuItemCreate };
    case "menu-items/create/data":
      menuItemCreate.state = API_STATE.DONE;
      return { ...state, menuItemCreate };

    case "menu-items/delete/loading":
      menuItemDelete.state = API_STATE.LOADING;
      return { ...state, menuItemDelete };
    case "menu-items/delete/error":
      menuItemDelete.state = API_STATE.ERROR;
      menuItemDelete.error = payload;
      return { ...state, menuItemDelete };
    case "menu-items/delete/data":
      menuItemDelete.state = API_STATE.DONE;
      return { ...state, menuItemDelete };
    default:
      return state;
  }
};

export { menuItemReducer };
