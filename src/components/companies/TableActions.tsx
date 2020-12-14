import React, { Dispatch, useState } from "react";
import * as H from "history";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import {
  CompanyAction,
  CompanyStoreState,
} from "../../interfaces/CompanyInterface";
import CommonModal from "../common/CommonModal";
import secureDomain from "../hoc/SecureDomain";
import { deleteCompany } from "../../redux/thunks/CompanyThunks";
import { API_STATE } from "../../utils/constants/common";
import { AxiosError } from "axios";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";

interface Props {
  companyId: string;
  companyDeleteError: null | AxiosError;
  companyDeleteLoadingState: string;
  history: H.History;
  deleteCompany(_id: string, history: H.History): void;
}

const mapStateToProps = (state: { companyReducer: CompanyStoreState }) => {
  const { companyDelete } = state.companyReducer;
  return {
    companyDeleteError: companyDelete.error,
    companyDeleteLoadingState: companyDelete.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<CompanyAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    deleteCompany: (_id: string, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(deleteCompany(_id, history));
    },
  };
};

const TableActions: React.FC<Props> = ({
  companyId,
  companyDeleteLoadingState,
  companyDeleteError,
  history,
  deleteCompany,
}) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const onConfirm = () => {
    deleteCompany(companyId, history);
  };
  const hideDialog = () => setShowDialog(false);

  return (
    <>
      <CommonModal
        onConfirm={onConfirm}
        hideDialog={hideDialog}
        title="Delete Company"
        body="Are you sure you want to delete this?"
        confirmText="Delete"
        show={showDialog}
        loading={companyDeleteLoadingState === API_STATE.LOADING}
        errors={formatResponseErrors(companyDeleteError)}
      />
      <NavLink
        to={`/companies/view/${companyId}?viewAction=view`}
        className="pr-2"
      >
        view
      </NavLink>
      <NavLink to={`/companies/view/${companyId}?viewAction=edit`}>
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
