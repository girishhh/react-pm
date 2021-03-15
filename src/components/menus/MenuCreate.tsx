import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import lodash from "lodash";
import React, { Dispatch } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import { FoodCategoryInterface } from "../../interfaces/FoodCategoryInterface";
import {
  MenuAction,
  MenuInterface,
  MenuStoreState,
} from "../../interfaces/MenuInterface";
import {
  createMenu,
  fetchMenuDetails,
  updateMenu,
} from "../../redux/thunks/MenuThunks";
import { API_STATE, ViewActionTypes } from "../../utils/constants/common";
import { EDIT_PATH } from "../../utils/constants/MenuConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import MenuItemAutoComplete from "../menu-items/MenuItemAutoComplete";
import { menuSchema, menuUISchema } from "./MenuSchema";

interface Props extends LocationProps {
  menuCreate: MenuInterface;
  menuCreateError: null | AxiosError;
  menuCreateLoadingState: string;
  createMenu(menu: MenuInterface, history: H.History, successUrl: string): void;
  menuUpdateError: null | AxiosError;
  menuUpdateLoadingState: string;
  updateMenu(menu: MenuInterface, history: H.History, successUrl: string): void;
  menuDetails: MenuInterface;
  menuDetailsError: null | AxiosError;
  menuDetailsLoadingState: string;
  fetchMenuDetails(_id: string): void;
}

interface State {
  formData: MenuInterface | {};
}

const mapStateToProps = (state: { menuReducer: MenuStoreState }) => {
  const { menuCreate, menuDetails, menuUpdate } = state.menuReducer;
  return {
    menuCreate: menuCreate.data.menuCreate,
    menuCreateError: menuCreate.error,
    menuCreateLoadingState: menuCreate.state,
    menuDetails: menuDetails.data.menuDetails,
    menuDetailsError: menuDetails.error,
    menuDetailsLoadingState: menuDetails.state,
    menuUpdateError: menuUpdate.error,
    menuUpdateLoadingState: menuUpdate.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<MenuAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createMenu: (
      menu: MenuInterface,
      history: H.History,
      successUrl: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createMenu(menu, history, successUrl));
    },

    fetchMenuDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchMenuDetails({ _id }));
    },
    updateMenu: (
      menu: MenuInterface,
      history: H.History,
      successUrl: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateMenu(menu, history, successUrl));
    },
  };
};

class MenuCreate extends React.Component<Props, State> {
  state = { formData: {} };
  viewAction: string;
  canEditMenu: boolean;

  constructor(props: Props) {
    super(props);
    const { restaurentId } = this.props.match.params as any;
    this.viewAction =
      restaurentId && EDIT_PATH.test(props.location.pathname)
        ? ViewActionTypes.EDIT
        : ViewActionTypes.CREATE;
    const currentUser = getUser();
    this.canEditMenu = currentUser?.permissions.includes("editMenu") as boolean;
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    let formData = event.formData;
    const { restaurentId } = this.props.match.params as any;
    formData = {
      ...formData,
      menuItems: formData.menuItems.map(
        (menuItem: FoodCategoryInterface) => menuItem._id
      ),
      restaurent: restaurentId,
    };
    this.setState({ formData });
    if (this.viewAction === ViewActionTypes.EDIT) {
      this.props.updateMenu(
        formData,
        this.props.history,
        `/restaurents/${restaurentId}/menus`
      );
    } else {
      this.props.createMenu(
        formData,
        this.props.history,
        `/restaurents/${restaurentId}/menus`
      );
    }
  };

  componentDidMount(): void {
    if (this.viewAction === ViewActionTypes.EDIT) {
      const { menuId } = this.props.match.params as any;
      this.props.fetchMenuDetails(encodeURIComponent(menuId));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.viewAction === ViewActionTypes.EDIT &&
      this.props.menuDetails &&
      !lodash.isEqual(prevProps.menuDetails, this.props.menuDetails)
    ) {
      const { menuDetails } = this.props;
      this.setState({
        formData: {
          ...menuDetails,
        },
      });
    } else if (
      this.viewAction === ViewActionTypes.EDIT &&
      lodash.isEqual(prevProps.menuDetails, this.props.menuDetails) &&
      !lodash.isEqual(this.props.menuDetails, this.state.formData) &&
      !lodash.isEmpty(this.props.menuDetails)
    ) {
      this.setState({
        formData: {
          ...this.props.menuDetails,
        },
      });
    }
  }

  isLoading(): boolean {
    return (
      this.props.menuDetailsLoadingState === API_STATE.LOADING ||
      this.props.menuUpdateLoadingState === API_STATE.LOADING ||
      this.props.menuCreateLoadingState === API_STATE.LOADING
    );
  }

  isError(): boolean {
    return (
      this.props.menuDetailsLoadingState === API_STATE.ERROR ||
      this.props.menuUpdateLoadingState === API_STATE.ERROR ||
      this.props.menuCreateLoadingState === API_STATE.ERROR
    );
  }

  render() {
    const { menuCreateError, menuDetailsError, menuUpdateError } = this.props;
    const fields = { menuItemAuto: MenuItemAutoComplete };
    const { restaurentId } = this.props.match.params as any;

    return (
      <div className="menu-create">
        {this.isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {this.isError() && (
          <>
            <ApiError errors={formatResponseErrors(menuCreateError)} />
            <ApiError errors={formatResponseErrors(menuDetailsError)} />
            <ApiError errors={formatResponseErrors(menuUpdateError)} />
          </>
        )}
        {!this.isLoading() && (
          <Row className="w-100 justify-content-start pl-1">
            <Col md="4">
              <Form
                id="food-item-create-form"
                schema={menuSchema}
                uiSchema={menuUISchema}
                fields={fields}
                formData={this.state.formData}
                formContext={{ restaurentId }}
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
)(secureDomain<Props>(MenuCreate));
