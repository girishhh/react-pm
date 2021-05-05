import { AddressStoreState } from "../../interfaces/AddressInterface";
import { ActionType } from "../../interfaces/CommonInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  addressList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  addressDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  addressUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  addressCreate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  addressDelete: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const addressReducer = (
  state = initialState,
  action: ActionType
): AddressStoreState => {
  const { type, payload } = action;
  const {
    addressList,
    addressDetails,
    addressUpdate,
    addressCreate,
    addressDelete,
  } = state;
  switch (type) {
    case "address/list/loading":
      addressList.state = API_STATE.LOADING;
      return { ...state, addressList };
    case "address/list/error":
      addressList.state = API_STATE.ERROR;
      addressList.error = payload;
      return { ...state, addressList };
    case "address/list/data":
      addressList.data = payload;
      addressList.state = API_STATE.DONE;
      return { ...state, addressList };

    case "address/details/loading":
      addressDetails.state = API_STATE.LOADING;
      return { ...state, addressDetails };
    case "address/details/error":
      addressDetails.state = API_STATE.ERROR;
      addressDetails.error = payload;
      return { ...state, addressDetails };
    case "address/details/data":
      addressDetails.data = payload;
      addressDetails.state = API_STATE.DONE;
      return { ...state, addressDetails };

    case "address/update/loading":
      addressUpdate.state = API_STATE.LOADING;
      return { ...state, addressUpdate };
    case "address/update/error":
      addressUpdate.state = API_STATE.ERROR;
      addressUpdate.error = payload;
      return { ...state, addressUpdate };
    case "address/update/data":
      addressUpdate.state = API_STATE.DONE;
      return { ...state, addressUpdate };

    case "address/create/loading":
      addressCreate.state = API_STATE.LOADING;
      return { ...state, addressCreate };
    case "address/create/error":
      addressCreate.state = API_STATE.ERROR;
      addressCreate.error = payload;
      return { ...state, addressCreate };
    case "address/create/data":
      addressCreate.state = API_STATE.DONE;
      return { ...state, addressCreate };

    case "address/delete/loading":
      addressDelete.state = API_STATE.LOADING;
      return { ...state, addressDelete };
    case "address/delete/error":
      addressDelete.state = API_STATE.ERROR;
      addressDelete.error = payload;
      return { ...state, addressDelete };
    case "address/delete/data":
      addressDelete.state = API_STATE.DONE;
      return { ...state, addressDelete };

    default:
      return state;
  }
};

export { addressReducer };
