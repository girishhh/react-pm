import React, { Dispatch, useState } from "react";
import * as H from "history";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import {
  FoodItemAction,
  FoodItemStoreState,
} from "../../interfaces/FoodItemInterface";
import CommonModal from "../common/CommonModal";
import secureDomain from "../hoc/SecureDomain";
import { deleteFoodItem } from "../../redux/thunks/FoodItemThunks";
import { API_STATE } from "../../utils/constants/common";
import { AxiosError } from "axios";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import { ROLES } from "../../utils/constants/RoleConstants";

interface Props {
  foodItemId: string;
  foodItemDeleteError: null | AxiosError;
  foodItemDeleteLoadingState: string;
  history: H.History;
  deleteFoodItem(_id: string, history: H.History): void;
  restaurentId: string;
}

const mapStateToProps = (state: { foodItemReducer: FoodItemStoreState }) => {
  const { foodItemDelete } = state.foodItemReducer;
  return {
    foodItemDeleteError: foodItemDelete.error,
    foodItemDeleteLoadingState: foodItemDelete.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    deleteFoodItem: (_id: string, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(deleteFoodItem(_id, history));
    },
  };
};

const TableActions: React.FC<Props> = ({
  foodItemId,
  foodItemDeleteLoadingState,
  foodItemDeleteError,
  history,
  deleteFoodItem,
  restaurentId,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onConfirm = () => {
    deleteFoodItem(foodItemId, history);
  };
  const hideDialog = () => setShowDialog(false);

  return (
    <>
      <CommonModal
        onConfirm={onConfirm}
        hideDialog={hideDialog}
        title="Delete FoodItem"
        body="Are you sure you want to delete this?"
        confirmText="Delete"
        show={showDialog}
        loading={foodItemDeleteLoadingState === API_STATE.LOADING}
        errors={formatResponseErrors(foodItemDeleteError)}
      />
      <NavLink
        to={`/restaurents/${restaurentId}/food-items/view/${foodItemId}`}
        className="pr-2"
      >
        view
      </NavLink>
      <NavLink
        to={`/restaurents/${restaurentId}/food-items/edit/${foodItemId}`}
      >
        edit
      </NavLink>
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
