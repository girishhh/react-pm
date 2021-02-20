import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import lodash from "lodash";
import React, { Dispatch } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import { FoodCategoryInterface } from "../../interfaces/FoodCategoryInterface";
import {
  MenuItemAction,
  MenuItemInterface,
  MenuItemStoreState,
} from "../../interfaces/MenuItemInterface";
import {
  createMenuItem,
  fetchMenuItemDetails,
  updateMenuItem,
} from "../../redux/thunks/MenuItemThunks";
import { API_STATE, ViewActionTypes } from "../../utils/constants/common";
import { EDIT_PATH } from "../../utils/constants/MenuItemConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import FoodCategoryAutoComplete from "../food-items/FoodCategoryAutoComplete";
import secureDomain from "../hoc/SecureDomain";
import { menuItemSchema, menuItemUISchema } from "./MenuItemSchema";

interface Props extends LocationProps {
  menuItemCreate: MenuItemInterface;
  menuItemCreateError: null | AxiosError;
  menuItemCreateLoadingState: string;
  createMenuItem(
    menuItem: MenuItemInterface,
    history: H.History,
    successUrl: string
  ): void;
  menuItemUpdateError: null | AxiosError;
  menuItemUpdateLoadingState: string;
  updateMenuItem(
    menuItem: MenuItemInterface,
    history: H.History,
    successUrl: string
  ): void;
  menuItemDetails: MenuItemInterface;
  menuItemDetailsError: null | AxiosError;
  menuItemDetailsLoadingState: string;
  fetchMenuItemDetails(_id: string): void;
}

interface State {
  formData: MenuItemInterface | {};
}

const mapStateToProps = (state: { menuItemReducer: MenuItemStoreState }) => {
  const {
    menuItemCreate,
    menuItemDetails,
    menuItemUpdate,
  } = state.menuItemReducer;
  return {
    menuItemCreate: menuItemCreate.data.menuItemCreate,
    menuItemCreateError: menuItemCreate.error,
    menuItemCreateLoadingState: menuItemCreate.state,
    menuItemDetails: menuItemDetails.data.menuItemDetails,
    menuItemDetailsError: menuItemDetails.error,
    menuItemDetailsLoadingState: menuItemDetails.state,
    menuItemUpdateError: menuItemUpdate.error,
    menuItemUpdateLoadingState: menuItemUpdate.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<MenuItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createMenuItem: (
      menuItem: MenuItemInterface,
      history: H.History,
      successUrl: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createMenuItem(menuItem, history, successUrl));
    },

    fetchMenuItemDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchMenuItemDetails({ _id }));
    },
    updateMenuItem: (
      menuItem: MenuItemInterface,
      history: H.History,
      successUrl: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateMenuItem(menuItem, history, successUrl));
    },
  };
};

class MenuItemCreate extends React.Component<Props, State> {
  state = { formData: {} };
  viewAction: string;
  canEditMenuItem: boolean;

  constructor(props: Props) {
    super(props);
    const { restaurentId } = this.props.match.params as any;
    this.viewAction =
      restaurentId && EDIT_PATH.test(props.location.pathname)
        ? ViewActionTypes.EDIT
        : ViewActionTypes.CREATE;
    const currentUser = getUser();
    this.canEditMenuItem = currentUser?.permissions.includes(
      "editMenuItem"
    ) as boolean;
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    let formData = event.formData;
    const { restaurentId } = this.props.match.params as any;
    formData = {
      ...formData,
      categories: formData.categories.map(
        (category: FoodCategoryInterface) => category._id
      ),
      restaurent: restaurentId,
    };
    this.setState({ formData });
    if (this.viewAction === ViewActionTypes.EDIT) {
      this.props.updateMenuItem(
        formData,
        this.props.history,
        `/restaurents/${restaurentId}/menu-items`
      );
    } else {
      this.props.createMenuItem(
        formData,
        this.props.history,
        `/restaurents/${restaurentId}/menu-items`
      );
    }
  };

  componentDidMount(): void {
    if (this.viewAction === ViewActionTypes.EDIT) {
      const { menuItemId } = this.props.match.params as any;
      this.props.fetchMenuItemDetails(encodeURIComponent(menuItemId));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.viewAction === ViewActionTypes.EDIT &&
      this.props.menuItemDetails &&
      !lodash.isEqual(prevProps.menuItemDetails, this.props.menuItemDetails)
    ) {
      const { menuItemDetails } = this.props;
      this.setState({
        formData: {
          ...menuItemDetails,
        },
      });
    } else if (
      this.viewAction === ViewActionTypes.EDIT &&
      lodash.isEqual(prevProps.menuItemDetails, this.props.menuItemDetails) &&
      !lodash.isEqual(this.props.menuItemDetails, this.state.formData) &&
      !lodash.isEmpty(this.props.menuItemDetails)
    ) {
      this.setState({
        formData: {
          ...this.props.menuItemDetails,
        },
      });
    }
  }

  isLoading(): boolean {
    return (
      this.props.menuItemDetailsLoadingState === API_STATE.LOADING ||
      this.props.menuItemUpdateLoadingState === API_STATE.LOADING ||
      this.props.menuItemCreateLoadingState === API_STATE.LOADING
    );
  }

  isError(): boolean {
    return (
      this.props.menuItemDetailsLoadingState === API_STATE.ERROR ||
      this.props.menuItemUpdateLoadingState === API_STATE.ERROR ||
      this.props.menuItemCreateLoadingState === API_STATE.ERROR
    );
  }

  render() {
    const {
      menuItemCreateError,
      menuItemDetailsError,
      menuItemUpdateError,
    } = this.props;
    const fields = { foodCatAuto: FoodCategoryAutoComplete };

    return (
      <div className="food-item-create">
        {this.isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {this.isError() && (
          <>
            <ApiError errors={formatResponseErrors(menuItemCreateError)} />
            <ApiError errors={formatResponseErrors(menuItemDetailsError)} />
            <ApiError errors={formatResponseErrors(menuItemUpdateError)} />
          </>
        )}
        {!this.isLoading() && (
          <Row className="w-100 justify-content-start pl-1">
            <Col md="4">
              <Form
                id="food-item-create-form"
                schema={menuItemSchema}
                uiSchema={menuItemUISchema}
                fields={fields}
                formData={this.state.formData}
                showErrorList={false}
                onSubmit={this.onSubmit}
                noHtml5Validate
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(MenuItemCreate));
