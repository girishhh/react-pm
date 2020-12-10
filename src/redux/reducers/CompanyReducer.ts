import { ActionType } from "../../interfaces/CommonInterface";
import { CompanyStoreState } from "../../interfaces/CompanyInterface";
import { API_STATE } from "../../utils/constants/common";

const initialState = {
  companyList: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  companyDetails: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
  companyUpdate: {
    data: {},
    state: API_STATE.DONE,
    error: null,
    formData: {},
  },
};

const companyReducer = (
  state = initialState,
  action: ActionType
): CompanyStoreState => {
  const { type, payload } = action;
  const { companyList, companyDetails, companyUpdate } = state;
  switch (type) {
    case "companies/list/loading":
      companyList.state = API_STATE.LOADING;
      return { ...state, companyList };
    case "companies/list/error":
      companyList.state = API_STATE.ERROR;
      companyList.error = payload;
      return { ...state, companyList };
    case "companies/list/data":
      companyList.data = payload;
      companyList.state = API_STATE.DONE;
      return { ...state, companyList };

    case "companies/details/loading":
      companyDetails.state = API_STATE.LOADING;
      return { ...state, companyDetails };
    case "companies/details/error":
      companyDetails.state = API_STATE.ERROR;
      companyDetails.error = payload;
      return { ...state, companyDetails };
    case "companies/details/data":
      companyDetails.data = payload;
      companyDetails.state = API_STATE.DONE;
      return { ...state, companyDetails };

    case "companies/update/loading":
      companyUpdate.state = API_STATE.LOADING;
      return { ...state, companyUpdate };
    case "companies/update/error":
      companyUpdate.state = API_STATE.ERROR;
      companyUpdate.error = payload;
      return { ...state, companyUpdate };
    case "companies/update/data":
      companyUpdate.state = API_STATE.DONE;
      return { ...state, companyUpdate };
    default:
      return state;
  }
};

export { companyReducer };
