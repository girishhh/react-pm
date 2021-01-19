import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import {
  FoodCategoryStoreState,
  FoodCategoryAction,
} from "../../interfaces/FoodCategoryInterface";
import { deleteFoodCategory } from "../../redux/thunks/FoodThunks";
import { API_STATE } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import CommonModal from "../common/CommonModal";
import secureDomain from "../hoc/SecureDomain";

interface Props {
  foodCategoryId: string;
  foodCategoryDeleteError: null | AxiosError;
  foodCategoryDeleteLoadingState: string;
  history: H.History;
  deleteFoodCategory(_id: string, history: H.History): void;
}

const mapStateToProps = (state: {
  foodCategoryReducer: FoodCategoryStoreState;
}) => {
  const { foodCategoryDelete } = state.foodCategoryReducer;
  return {
    foodCategoryDeleteError: foodCategoryDelete.error,
    foodCategoryDeleteLoadingState: foodCategoryDelete.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodCategoryAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    deleteFoodCategory: (_id: string, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(deleteFoodCategory(_id, history));
    },
  };
};

const TableActions: React.FC<Props> = ({
  foodCategoryId,
  foodCategoryDeleteLoadingState,
  foodCategoryDeleteError,
  history,
  deleteFoodCategory,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onConfirm = () => {
    deleteFoodCategory(foodCategoryId, history);
  };
  const hideDialog = () => setShowDialog(false);

  return (
    <>
      <CommonModal
        onConfirm={onConfirm}
        hideDialog={hideDialog}
        title="Delete FoodCategory"
        body="Are you sure you want to delete this?"
        confirmText="Delete"
        show={showDialog}
        loading={foodCategoryDeleteLoadingState === API_STATE.LOADING}
        errors={formatResponseErrors(foodCategoryDeleteError)}
      />
      <NavLink to={`/food-categories/edit/${foodCategoryId}`}>edit</NavLink>
      <Button
        variant="link"
        className="delete-btn"
        onClick={() => setShowDialog(true)}
      >
        <span>delete</span>
      </Button>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(TableActions));
