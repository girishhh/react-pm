import { AxiosError } from "axios";
import React, { Dispatch } from "react";
import { Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  FoodItemAction,
  FoodItemInterface,
  FoodItemStoreState,
} from "../../interfaces/FoodItemInterface";
import { fetchFoodItemDetails } from "../../redux/thunks/FoodItemThunks";
import { API_STATE } from "../../utils/constants/common";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";

interface Props extends LocationProps {
  foodItemDetails: FoodItemInterface;
  foodItemDetailsError: null | AxiosError;
  foodItemDetailsLoadingState: string;
  fetchFoodItemDetails(_id: string): void;
}

const mapStateToProps = (state: { foodItemReducer: FoodItemStoreState }) => {
  const { foodItemDetails } = state.foodItemReducer;
  return {
    foodItemDetails: foodItemDetails.data.foodItemDetails,
    foodItemDetailsError: foodItemDetails.error,
    foodItemDetailsLoadingState: foodItemDetails.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchFoodItemDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchFoodItemDetails({ _id }));
    },
  };
};

class FoodItemView extends React.Component<Props> {
  componentDidMount(): void {
    const { foodItemId } = this.props.match.params as any;
    this.props.fetchFoodItemDetails(encodeURIComponent(foodItemId));
  }

  isLoading = (): boolean => {
    return this.props.foodItemDetailsLoadingState === API_STATE.LOADING;
  };

  render() {
    const {
      foodItemDetailsLoadingState,
      foodItemDetails,
      foodItemDetailsError,
    } = this.props;
    const currentUser = getUser();
    const canViewFoodItem = currentUser?.permissions.includes("viewFoodItem");

    return (
      <div className="foodItem-list">
        {this.isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {foodItemDetailsLoadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(foodItemDetailsError)} />
        )}

        {foodItemDetailsLoadingState === API_STATE.DONE &&
          canViewFoodItem &&
          foodItemDetails && (
            <div className="pl-5">
              <Row className="w-100 justify-content-start">
                <Row className="w-100">FoodItemName</Row>
                <Row className="w-100">{foodItemDetails.name}</Row>

                <Row className="w-100 pt-3">Type</Row>
                <Row className="w-100">{foodItemDetails.type}</Row>

                <Row className="w-100 pt-3">Categories</Row>
                <Row className="w-100">
                  {foodItemDetails.categories
                    ?.map((category) => category.name)
                    .join(", ")}
                </Row>
              </Row>
            </div>
          )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(FoodItemView));
