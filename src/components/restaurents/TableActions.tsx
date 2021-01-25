import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import {
  RestaurentAction,
  RestaurentStoreState,
} from "../../interfaces/RestaurentInterface";
import { deleteRestaurent } from "../../redux/thunks/RestaurentThunks";
import { API_STATE } from "../../utils/constants/common";
import { ROLES } from "../../utils/constants/RoleConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import {
  formatResponseErrors,
  hasRole,
} from "../../utils/helpers/CommonHelper";
import CommonModal from "../common/CommonModal";
import secureDomain from "../hoc/SecureDomain";

interface Props {
  restaurentId: string;
  restaurentDeleteError: null | AxiosError;
  restaurentDeleteLoadingState: string;
  history: H.History;
  deleteRestaurent(_id: string, history: H.History): void;
}

const mapStateToProps = (state: {
  restaurentReducer: RestaurentStoreState;
}) => {
  const { restaurentDelete } = state.restaurentReducer;
  return {
    restaurentDeleteError: restaurentDelete.error,
    restaurentDeleteLoadingState: restaurentDelete.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RestaurentAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    deleteRestaurent: (_id: string, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(deleteRestaurent(_id, history));
    },
  };
};

const TableActions: React.FC<Props> = ({
  restaurentId,
  restaurentDeleteLoadingState,
  restaurentDeleteError,
  history,
  deleteRestaurent,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onConfirm = () => {
    deleteRestaurent(restaurentId, history);
  };
  const hideDialog = () => setShowDialog(false);

  return (
    <>
      {getUser()?.permissions.includes("deleteRestaurent") && (
        <CommonModal
          onConfirm={onConfirm}
          hideDialog={hideDialog}
          title="Delete Restaurent"
          body="Are you sure you want to delete this?"
          confirmText="Delete"
          show={showDialog}
          loading={restaurentDeleteLoadingState === API_STATE.LOADING}
          errors={formatResponseErrors(restaurentDeleteError)}
        />
      )}

      {getUser()?.permissions.includes("viewRestaurent") && (
        <NavLink
          to={`/restaurents/view/${restaurentId}?viewAction=view`}
          className="pr-2"
        >
          view
        </NavLink>
      )}

      {getUser()?.permissions.includes("editRestaurent") && (
        <NavLink to={`/restaurents/edit/${restaurentId}`}>edit</NavLink>
      )}

      {getUser()?.permissions.includes("deleteRestaurent") && (
        <Button
          variant="link"
          className="delete-btn"
          onClick={() => setShowDialog(true)}
        >
          <span>delete</span>
        </Button>
      )}

      {getUser()?.permissions.includes("createOwner") && (
        <NavLink
          to={`/users/create?role=${ROLES.OWNER}&&restaurentId=${restaurentId}`}
        >
          addOwner
        </NavLink>
      )}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(TableActions));
