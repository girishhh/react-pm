import Form, { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
//@ts-ignore
import lodash from "lodash";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  FoodCategoryAction,
  FoodCategoryInterface,
  FoodCategoryStoreState,
} from "../../interfaces/FoodCategoryInterface";
import {
  createFoodCategory,
  fetchFoodCategoryDetails,
  updateFoodCategory,
} from "../../redux/thunks/FoodThunks";
import { API_STATE, ViewActionTypes } from "../../utils/constants/common";
import { EDIT_PATH } from "../../utils/constants/FoodCategoryConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import CompanyCreate from "../companies/CompanyCreate";
import secureDomain from "../hoc/SecureDomain";
import { foodCategorySchema, foodCategoryUISchema } from "./FoodCategorySchema";

interface Props extends LocationProps {
  foodCategoryCreate: FoodCategoryInterface;
  foodCategoryCreateError: null | AxiosError;
  foodCategoryCreateLoadingState: string;
  createFoodCategory(
    foodCategory: FoodCategoryInterface,
    history: H.History
  ): void;
  foodCategoryUpdate: FoodCategoryInterface;
  foodCategoryUpdateError: null | AxiosError;
  foodCategoryUpdateLoadingState: string;
  updateFoodCategory(
    foodCategory: FoodCategoryInterface,
    history: H.History
  ): void;
  foodCategoryDetails: FoodCategoryInterface;
  foodCategoryDetailsError: null | AxiosError;
  foodCategoryDetailsLoadingState: string;
  fetchFoodCategoryDetails(_id: string): void;
}

interface State {
  formData: FoodCategoryInterface | {};
}

const mapStateToProps = (state: {
  foodCategoryReducer: FoodCategoryStoreState;
}) => {
  const {
    foodCategoryCreate,
    foodCategoryUpdate,
    foodCategoryDetails,
  } = state.foodCategoryReducer;
  return {
    foodCategoryCreate: foodCategoryCreate.data.foodCategoryCreate,
    foodCategoryCreateError: foodCategoryCreate.error,
    foodCategoryCreateLoadingState: foodCategoryCreate.state,
    foodCategoryUpdate: foodCategoryUpdate.data.foodCategoryUpdate,
    foodCategoryUpdateError: foodCategoryUpdate.error,
    foodCategoryUpdateLoadingState: foodCategoryUpdate.state,
    foodCategoryDetails: foodCategoryDetails.data.foodCategoryDetails,
    foodCategoryDetailsError: foodCategoryDetails.error,
    foodCategoryDetailsLoadingState: foodCategoryDetails.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodCategoryAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createFoodCategory: (
      foodCategory: FoodCategoryInterface,
      history: H.History
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createFoodCategory(foodCategory, history));
    },
    updateFoodCategory: (
      foodCategory: FoodCategoryInterface,
      history: H.History
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateFoodCategory(foodCategory, history));
    },
    fetchFoodCategoryDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchFoodCategoryDetails({ _id }));
    },
  };
};

class FoodCategoryCreate extends React.Component<Props, State> {
  state = { formData: {} };
  viewAction: string;
  canEditFoodCategory: boolean;

  constructor(props: Props) {
    super(props);
    const { foodCategoryId } = this.props.match.params as any;
    this.viewAction =
      foodCategoryId && EDIT_PATH.test(props.location.pathname)
        ? ViewActionTypes.EDIT
        : ViewActionTypes.CREATE;
    const currentUser = getUser();
    this.canEditFoodCategory = currentUser?.permissions.includes(
      "editFoodCategory"
    ) as boolean;
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    this.setState({ formData: event.formData });
    if (this.viewAction === ViewActionTypes.EDIT) {
      this.props.updateFoodCategory(event.formData, this.props.history);
    } else {
      this.props.createFoodCategory(event.formData, this.props.history);
    }
  };

  isLoading = (): boolean => {
    return (
      this.props.foodCategoryDetailsLoadingState === API_STATE.LOADING ||
      this.props.foodCategoryUpdateLoadingState === API_STATE.LOADING ||
      this.props.foodCategoryCreateLoadingState === API_STATE.LOADING
    );
  };

  isError = (): boolean => {
    return (
      this.props.foodCategoryDetailsLoadingState === API_STATE.ERROR ||
      this.props.foodCategoryUpdateLoadingState === API_STATE.ERROR ||
      this.props.foodCategoryCreateLoadingState === API_STATE.ERROR
    );
  };

  componentDidMount(): void {
    if (this.viewAction === ViewActionTypes.EDIT) {
      const { foodCategoryId } = this.props.match.params as any;
      this.props.fetchFoodCategoryDetails(encodeURIComponent(foodCategoryId));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.viewAction === ViewActionTypes.EDIT &&
      this.props.foodCategoryDetails &&
      !lodash.isEqual(
        prevProps.foodCategoryDetails,
        this.props.foodCategoryDetails
      )
    ) {
      const { foodCategoryDetails } = this.props;
      this.setState({
        formData: foodCategoryDetails,
      });
    }
  }

  render() {
    const {
      foodCategoryCreateError,
      foodCategoryDetailsError,
      foodCategoryUpdateError,
    } = this.props;
    return (
      <div className="food-category-create">
        {this.isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {this.isError() && (
          <>
            <ApiError errors={formatResponseErrors(foodCategoryCreateError)} />
            <ApiError errors={formatResponseErrors(foodCategoryDetailsError)} />
            <ApiError errors={formatResponseErrors(foodCategoryUpdateError)} />
          </>
        )}
        {!this.isLoading() && (
          <Row className="w-100 justify-content-start pl-1">
            <Col md="4">
              <Form
                id="food-category-view-form"
                schema={foodCategorySchema}
                uiSchema={foodCategoryUISchema}
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
)(secureDomain<Props>(FoodCategoryCreate));
