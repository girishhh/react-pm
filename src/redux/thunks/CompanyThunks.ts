import { Dispatch } from "react";
import {
  CompanyAction,
  CompanyDetailsPayload,
  CompanyInterface,
  CompanyListReqPayLoad,
} from "../../interfaces/CompanyInterface";
import CompanyService from "../../services/api/CompanyService";
import * as H from "history";

export function fetchCompanyList(payload: CompanyListReqPayLoad) {
  return async function fetchCompanyListThunk(
    dispatch: Dispatch<CompanyAction>
  ) {
    try {
      dispatch({ type: "companies/list/loading" });
      const data = await CompanyService.fetchCompanyList(
        payload.start,
        payload.limit
      );
      dispatch({
        type: "companies/list/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "companies/list/error", payload: error });
    }
  };
}

export function fetchCompanyDetails(payload: CompanyDetailsPayload) {
  return async function fetchCompanyDetailsThunk(
    dispatch: Dispatch<CompanyAction>
  ) {
    try {
      dispatch({ type: "companies/details/loading" });
      const data = await CompanyService.fetchCompanyDetails(payload._id);
      dispatch({
        type: "companies/details/data",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "companies/details/error", payload: error });
    }
  };
}

export function updateCompany(payload: CompanyInterface, history: H.History) {
  return async function updateCompanyThunk(dispatch: Dispatch<CompanyAction>) {
    try {
      dispatch({ type: "companies/update/loading" });
      const data = await CompanyService.updateCompany(payload);
      dispatch({ type: "companies/update/data" });
      if (data.status === 204) history.push("/companies");
    } catch (error) {
      dispatch({ type: "companies/update/error", payload: error });
    }
  };
}
