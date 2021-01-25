import { AxiosError } from "axios";
import React, { Dispatch } from "react";
import { Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  RestaurentAction,
  RestaurentInterface,
  RestaurentStoreState,
} from "../../interfaces/RestaurentInterface";
import { fetchRestaurentDetails } from "../../redux/thunks/RestaurentThunks";
import { API_STATE } from "../../utils/constants/common";
import { ViewActionTypes } from "../../utils/constants/common";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";

interface Props extends LocationProps {
  restaurentDetails: RestaurentInterface;
  restaurentDetailsError: null | AxiosError;
  restaurentDetailsLoadingState: string;
  fetchRestaurentDetails(_id: string): void;
}

const mapStateToProps = (state: {
  restaurentReducer: RestaurentStoreState;
}) => {
  const { restaurentDetails, restaurentUpdate } = state.restaurentReducer;
  return {
    restaurentDetails: restaurentDetails.data.restaurentDetails,
    restaurentDetailsError: restaurentDetails.error,
    restaurentDetailsLoadingState: restaurentDetails.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RestaurentAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchRestaurentDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchRestaurentDetails({ _id }));
    },
  };
};

class RestaurentView extends React.Component<Props> {
  componentDidMount(): void {
    const { restaurentId } = this.props.match.params as any;
    this.props.fetchRestaurentDetails(encodeURIComponent(restaurentId));
  }

  isLoading = (): boolean => {
    return this.props.restaurentDetailsLoadingState === API_STATE.LOADING;
  };

  render() {
    const {
      restaurentDetailsLoadingState,
      restaurentDetails,
      restaurentDetailsError,
    } = this.props;
    const currentUser = getUser();
    const canViewRestaurent = currentUser?.permissions.includes(
      "viewRestaurent"
    );
    const canViewFoodItemList = currentUser?.permissions.includes(
      "viewFoodItemList"
    );
    const { restaurentId } = this.props.match.params as any;

    return (
      <div className="restaurent-list">
        {this.isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {restaurentDetailsLoadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(restaurentDetailsError)} />
        )}

        {restaurentDetailsLoadingState === API_STATE.DONE &&
          canViewRestaurent &&
          restaurentDetails && (
            <div className="pl-5">
              <Row className="w-100 justify-content-start">
                <Row className="w-100">RestaurentName</Row>
                <Row className="w-100">{restaurentDetails.name}</Row>

                <Row className="w-100 pt-3">Latitude</Row>
                <Row className="w-100">{restaurentDetails.lat}</Row>

                <Row className="w-100 pt-3">Longitude</Row>
                <Row className="w-100">{restaurentDetails.lng}</Row>

                <Row className="w-100 pt-3">Geo Location</Row>
                <Row className="w-100">
                  {restaurentDetails.geo_location_description}
                </Row>
              </Row>
              <Row className="w-100 justify-content-start">
                {canViewFoodItemList && (
                  <Row className="pt-3">
                    <NavLink to={`/restaurents/${restaurentId}/food-items`}>
                      View FoodItems
                    </NavLink>
                  </Row>
                )}
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
)(secureDomain<Props>(RestaurentView));
