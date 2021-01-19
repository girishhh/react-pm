import { AxiosResponse } from "axios";
import { CompanyInterface } from "./CompanyInterface";
import { DefaultResponse } from "./StoreInterface";

export interface FoodCategoryStoreState {
  foodCategoryList: DefaultResponse;
  foodCategoryDetails: DefaultResponse;
  foodCategoryUpdate: DefaultResponse;
  foodCategoryCreate: DefaultResponse;
  foodCategoryDelete: DefaultResponse;
}

export interface FoodCategoryInterface {
  _id: string;
  name: string;
  company: CompanyInterface;
}

export interface FoodCategoryListReqPayLoad {
  start: number;
  limit: number;
}

export interface FoodCategoryDetailsPayload {
  _id: string;
}

export interface FoodCategoryDetailsResp {
  foodCategoryDetails: FoodCategoryInterface;
}

export interface FoodCategoryListResp {
  total: number;
  foodCategoryList: FoodCategoryInterface[];
}

export type FoodCategoryPayloadTypes =
  | FoodCategoryListReqPayLoad
  | FoodCategoryListResp
  | FoodCategoryDetailsPayload
  | FoodCategoryDetailsResp
  | FoodCategoryInterface
  | AxiosResponse;

export type FoodCategoryAction = {
  type:
    | "food-categories/list/data"
    | "food-categories/list/loading"
    | "food-categories/list/error"
    | "food-categories/details/data"
    | "food-categories/details/loading"
    | "food-categories/details/error"
    | "food-categories/update/data"
    | "food-categories/update/loading"
    | "food-categories/update/error"
    | "food-categories/create/data"
    | "food-categories/create/loading"
    | "food-categories/create/error"
    | "food-categories/delete/data"
    | "food-categories/delete/loading"
    | "food-categories/delete/error";
  payload?: FoodCategoryPayloadTypes;
};
