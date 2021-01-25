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
  FoodItemAction,
  FoodItemInterface,
  FoodItemStoreState,
} from "../../interfaces/FoodItemInterface";
import {
  createFoodItem,
  fetchFoodItemDetails,
  updateFoodItem,
} from "../../redux/thunks/FoodItemThunks";
import { API_STATE, ViewActionTypes } from "../../utils/constants/common";
import { EDIT_PATH, FoodTypes } from "../../utils/constants/FoodItemConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import FoodCategoryAutoComplete from "./FoodCategoryAutoComplete";
import { foodItemSchema, foodItemUISchema } from "./FoodItemSchema";

interface Props extends LocationProps {
  foodItemCreate: FoodItemInterface;
  foodItemCreateError: null | AxiosError;
  foodItemCreateLoadingState: string;
  createFoodItem(
    foodItem: FoodItemInterface,
    history: H.History,
    successUrl: string
  ): void;
  foodItemUpdateError: null | AxiosError;
  foodItemUpdateLoadingState: string;
  updateFoodItem(
    foodItem: FoodItemInterface,
    history: H.History,
    successUrl: string
  ): void;
  foodItemDetails: FoodItemInterface;
  foodItemDetailsError: null | AxiosError;
  foodItemDetailsLoadingState: string;
  fetchFoodItemDetails(_id: string): void;
}

interface State {
  formData: FoodItemInterface | {};
}

const mapStateToProps = (state: { foodItemReducer: FoodItemStoreState }) => {
  const {
    foodItemCreate,
    foodItemDetails,
    foodItemUpdate,
  } = state.foodItemReducer;
  return {
    foodItemCreate: foodItemCreate.data.foodItemCreate,
    foodItemCreateError: foodItemCreate.error,
    foodItemCreateLoadingState: foodItemCreate.state,
    foodItemDetails: foodItemDetails.data.foodItemDetails,
    foodItemDetailsError: foodItemDetails.error,
    foodItemDetailsLoadingState: foodItemDetails.state,
    foodItemUpdateError: foodItemUpdate.error,
    foodItemUpdateLoadingState: foodItemUpdate.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createFoodItem: (
      foodItem: FoodItemInterface,
      history: H.History,
      successUrl: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createFoodItem(foodItem, history, successUrl));
    },

    fetchFoodItemDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchFoodItemDetails({ _id }));
    },
    updateFoodItem: (
      foodItem: FoodItemInterface,
      history: H.History,
      successUrl: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateFoodItem(foodItem, history, successUrl));
    },
  };
};

class FoodItemCreate extends React.Component<Props, State> {
  state = { formData: {} };
  viewAction: string;
  canEditFoodItem: boolean;

  constructor(props: Props) {
    super(props);
    const { restaurentId } = this.props.match.params as any;
    this.viewAction =
      restaurentId && EDIT_PATH.test(props.location.pathname)
        ? ViewActionTypes.EDIT
        : ViewActionTypes.CREATE;
    const currentUser = getUser();
    this.canEditFoodItem = currentUser?.permissions.includes(
      "editFoodItem"
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
      type: formData.type ? FoodTypes.VEG : FoodTypes.NON_VEG,
      restaurent: restaurentId,
    };
    this.setState({ formData });
    if (this.viewAction === ViewActionTypes.EDIT) {
      this.props.updateFoodItem(
        formData,
        this.props.history,
        `/restaurents/${restaurentId}/food-items`
      );
    } else {
      this.props.createFoodItem(
        formData,
        this.props.history,
        `/restaurents/${restaurentId}/food-items`
      );
    }
  };

  componentDidMount(): void {
    if (this.viewAction === ViewActionTypes.EDIT) {
      const { foodItemId } = this.props.match.params as any;
      this.props.fetchFoodItemDetails(encodeURIComponent(foodItemId));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.viewAction === ViewActionTypes.EDIT &&
      this.props.foodItemDetails &&
      !lodash.isEqual(prevProps.foodItemDetails, this.props.foodItemDetails)
    ) {
      const { foodItemDetails } = this.props;
      this.setState({
        formData: {
          ...foodItemDetails,
          type: foodItemDetails.type == FoodTypes.VEG,
        },
      });
    }
  }

  isLoading(): boolean {
    return (
      this.props.foodItemDetailsLoadingState === API_STATE.LOADING ||
      this.props.foodItemUpdateLoadingState === API_STATE.LOADING ||
      this.props.foodItemCreateLoadingState === API_STATE.LOADING
    );
  }

  isError(): boolean {
    return (
      this.props.foodItemDetailsLoadingState === API_STATE.ERROR ||
      this.props.foodItemUpdateLoadingState === API_STATE.ERROR ||
      this.props.foodItemCreateLoadingState === API_STATE.ERROR
    );
  }

  render() {
    const {
      foodItemCreateError,
      foodItemDetailsError,
      foodItemUpdateError,
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
            <ApiError errors={formatResponseErrors(foodItemCreateError)} />
            <ApiError errors={formatResponseErrors(foodItemDetailsError)} />
            <ApiError errors={formatResponseErrors(foodItemUpdateError)} />
          </>
        )}
        {!this.isLoading() && (
          <Row className="w-100 justify-content-start pl-1">
            <Col md="4">
              <Form
                id="food-item-create-form"
                schema={foodItemSchema}
                uiSchema={foodItemUISchema}
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
)(secureDomain<Props>(FoodItemCreate));
