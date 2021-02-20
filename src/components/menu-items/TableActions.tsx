import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import {
  MenuItemStoreState,
  MenuItemAction,
} from "../../interfaces/MenuItemInterface";
import { deleteMenuItem } from "../../redux/thunks/MenuItemThunks";
import { API_STATE } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import CommonModal from "../common/CommonModal";
import secureDomain from "../hoc/SecureDomain";

interface Props {
  menuItemId: string;
  restaurentId: string;
  menuItemDeleteError: null | AxiosError;
  menuItemDeleteLoadingState: string;
  history: H.History;
  deleteMenuItem(_id: string, history: H.History): void;
}

const mapStateToProps = (state: { menuItemReducer: MenuItemStoreState }) => {
  const { menuItemDelete } = state.menuItemReducer;
  return {
    menuItemDeleteError: menuItemDelete.error,
    menuItemDeleteLoadingState: menuItemDelete.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<MenuItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    deleteMenuItem: (_id: string, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(deleteMenuItem(_id, history));
    },
  };
};

const TableActions: React.FC<Props> = ({
  restaurentId,
  menuItemId,
  menuItemDeleteLoadingState,
  menuItemDeleteError,
  history,
  deleteMenuItem,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onConfirm = () => {
    deleteMenuItem(menuItemId, history);
  };
  const hideDialog = () => setShowDialog(false);

  return (
    <>
      <CommonModal
        onConfirm={onConfirm}
        hideDialog={hideDialog}
        title="Delete MenuItem"
        body="Are you sure you want to delete this?"
        confirmText="Delete"
        show={showDialog}
        loading={menuItemDeleteLoadingState === API_STATE.LOADING}
        errors={formatResponseErrors(menuItemDeleteError)}
      />
      <NavLink
        to={`/restaurents/${restaurentId}/menu-items/${menuItemId}/edit`}
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
