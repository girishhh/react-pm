import { AxiosError } from "axios";
import React, { Dispatch } from "react";
import * as H from "history";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  RestaurentAction,
  RestaurentInterface,
  RestaurentStoreState,
} from "../../interfaces/RestaurentInterface";
import { fetchRestaurentDetails } from "../../redux/thunks/RestaurentThunks";
import { API_STATE } from "../../utils/constants/common";
import { ROLES } from "../../utils/constants/RoleConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import {
  formatResponseErrors,
  hasRole,
} from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import CustomerRestaurentView from "./CustomerRestaurentView";
import OwnerAdminRestaurentView from "./OwnerAdminRestaurentView";

interface Props extends LocationProps {
  restaurentDetails: RestaurentInterface;
  restaurentDetailsError: null | AxiosError;
  restaurentDetailsLoadingState: string;
  fetchRestaurentDetails(_id: string): void;
  history: H.History;
}

const mapStateToProps = (state: {
  restaurentReducer: RestaurentStoreState;
}) => {
  const { restaurentDetails } = state.restaurentReducer;
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
      history,
    } = this.props;
    const currentUser = getUser();
    const canViewRestaurent = currentUser?.permissions.includes(
      "viewRestaurent"
    );

    return (
      <div className="restaurent-view h-100">
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
            <>
              {(hasRole(currentUser?.roles, ROLES.COMPANY_ADMIN) ||
                hasRole(currentUser?.roles, ROLES.OWNER)) && (
                <OwnerAdminRestaurentView
                  restaurentDetails={restaurentDetails}
                />
              )}
              {hasRole(currentUser?.roles, ROLES.CUSTOMER) && (
                <CustomerRestaurentView
                  restaurentDetails={restaurentDetails}
                  history={history}
                />
              )}
            </>
          )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(RestaurentView));
