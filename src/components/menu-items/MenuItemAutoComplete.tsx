import { FieldProps } from "@rjsf/core";
import { AxiosError } from "axios";
import lodash from "lodash";
import React, { Dispatch, ReactElement } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  MenuItemInterface,
  MenuItemListReqPayLoad,
  MenuItemStoreState,
} from "../../interfaces/MenuItemInterface";
import { SignUpAction } from "../../interfaces/SignUpInterface";
import { fetchMenuItemList } from "../../redux/thunks/MenuItemThunks";
import { API_STATE, PaginationConstants } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import "../menus/MenuCreate.scss";

interface Props extends LocationProps, FieldProps {
  menuItemList: MenuItemInterface[];
  menuItemListError: null | AxiosError;
  menuItemListState: string;
  fetchMenuItemList(payload: MenuItemListReqPayLoad): void;
  menuItemListTotal: number;
  restaurentId: string;
}

const mapStateToProps = (state: { menuItemReducer: MenuItemStoreState }) => {
  const { menuItemList } = state.menuItemReducer;
  return {
    menuItemList: menuItemList.data.menuItemList,
    menuItemListError: menuItemList.error,
    menuItemListState: menuItemList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SignUpAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchMenuItemList: (payload: MenuItemListReqPayLoad) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchMenuItemList(payload));
    },
  };
};

const MenuItemAutoComplete: React.FC<Props> = ({
  fetchMenuItemList,
  menuItemList,
  menuItemListError,
  menuItemListState,
  formData,
  onChange,
  formContext: { restaurentId },
}): ReactElement => {
  return (
    <>
      {menuItemListState === API_STATE.ERROR && (
        <ApiError errors={formatResponseErrors(menuItemListError)} />
      )}
      <span>Add Menu Items</span>
      <AsyncTypeahead
        id="menu-item-auto-complete"
        labelKey="name"
        isLoading={menuItemListState === API_STATE.LOADING}
        selected={formData}
        multiple={true}
        onSearch={(query) => {
          const conditions = {
            name: { contains: query },
            restaurent: { eq: restaurentId },
          };
          fetchMenuItemList({
            start: PaginationConstants.ZERO,
            limit: PaginationConstants.INFINITE,
            conditions: JSON.stringify(conditions),
          });
        }}
        options={menuItemList}
        onChange={(selected: MenuItemInterface[]) => {
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
)(secureDomain<Props>(MenuItemAutoComplete));
