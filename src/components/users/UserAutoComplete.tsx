import { FieldProps } from "@rjsf/core";
import { AxiosError } from "axios";
import React, { Dispatch, ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import { SignUpAction } from "../../interfaces/SignUpInterface";
import {
  UserInterface,
  UserStoreState,
  UserListReqPayLoad,
} from "../../interfaces/UserInterface";
import { fetchUserList } from "../../redux/thunks/UserThunks";
import { API_STATE, PaginationConstants } from "../../utils/constants/common";
import { ROLES } from "../../utils/constants/RoleConstants";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";

interface Props extends LocationProps, FieldProps {
  userList: UserInterface[];
  userListError: null | AxiosError;
  userListState: string;
  fetchUserList(payload: UserListReqPayLoad): void;
  userListTotal: number;
}

const mapStateToProps = (state: { userReducer: UserStoreState }) => {
  const { userList } = state.userReducer;
  return {
    userList: userList.data.userList,
    userListError: userList.error,
    userListState: userList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SignUpAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchUserList: (payload: UserListReqPayLoad) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchUserList(payload));
    },
  };
};

const UserAutoComplete: React.FC<Props> = ({
  fetchUserList,
  userList,
  userListError,
  userListState,
  formContext,
  onChange,
}): ReactElement => {
  const { restaurentId } = formContext;
  return (
    <>
      {userListState === API_STATE.ERROR && (
        <ApiError errors={formatResponseErrors(userListError)} />
      )}
      <AsyncTypeahead
        labelKey="email"
        isLoading={userListState === API_STATE.LOADING}
        onSearch={(query) => {
          const conditions = {
            roles: { in: [ROLES.OWNER] },
            email: { contains: query },
            restaurents: { nin: [restaurentId] },
          };
          fetchUserList({
            start: PaginationConstants.ZERO,
            limit: PaginationConstants.INFINITE,
            conditions: JSON.stringify(conditions),
          });
        }}
        options={userList}
        onChange={(selected: UserInterface[]) => {
          const user = selected[0];
          onChange(
            JSON.stringify({
              _id: user._id,
              restaurents: [...user.restaurents, restaurentId],
            })
          );
        }}
      />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(UserAutoComplete));
