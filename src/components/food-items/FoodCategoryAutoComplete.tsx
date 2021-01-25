import { FieldProps } from "@rjsf/core";
import { AxiosError } from "axios";
import lodash from "lodash";
import React, { Dispatch, ReactElement } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  FoodCategoryInterface,
  FoodCategoryListReqPayLoad,
  FoodCategoryStoreState,
} from "../../interfaces/FoodCategoryInterface";
import { SignUpAction } from "../../interfaces/SignUpInterface";
import { fetchFoodCategoryList } from "../../redux/thunks/FoodThunks";
import { API_STATE, PaginationConstants } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import "./FoodItemCreate.scss";

interface Props extends LocationProps, FieldProps {
  foodCategoryList: FoodCategoryInterface[];
  foodCategoryListError: null | AxiosError;
  foodCategoryListState: string;
  fetchFoodCategoryList(payload: FoodCategoryListReqPayLoad): void;
  foodCategoryListTotal: number;
}

const mapStateToProps = (state: {
  foodCategoryReducer: FoodCategoryStoreState;
}) => {
  const { foodCategoryList } = state.foodCategoryReducer;
  return {
    foodCategoryList: foodCategoryList.data.foodCategoryList,
    foodCategoryListError: foodCategoryList.error,
    foodCategoryListState: foodCategoryList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SignUpAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchFoodCategoryList: (payload: FoodCategoryListReqPayLoad) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchFoodCategoryList(payload));
    },
  };
};

const FoodCategoryAutoComplete: React.FC<Props> = ({
  fetchFoodCategoryList,
  foodCategoryList,
  foodCategoryListError,
  foodCategoryListState,
  formData,
  onChange,
}): ReactElement => {
  return (
    <>
      {foodCategoryListState === API_STATE.ERROR && (
        <ApiError errors={formatResponseErrors(foodCategoryListError)} />
      )}
      <span>Add Food Categories</span>
      <AsyncTypeahead
        labelKey="name"
        isLoading={foodCategoryListState === API_STATE.LOADING}
        selected={formData}
        multiple={true}
        onSearch={(query) => {
          const conditions = {
            name: { contains: query },
          };
          fetchFoodCategoryList({
            start: PaginationConstants.ZERO,
            limit: PaginationConstants.INFINITE,
            conditions: JSON.stringify(conditions),
          });
        }}
        options={foodCategoryList}
        onChange={(selected: FoodCategoryInterface[]) => {
          if (lodash.isEmpty(selected)) {
            onChange(undefined);
          } else {
            onChange(selected);
          }
        }}
      />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(FoodCategoryAutoComplete));
