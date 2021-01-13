import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  RestaurentAction,
  RestaurentInterface,
  RestaurentStoreState,
} from "../../interfaces/RestaurentInterface";
import {
  fetchRestaurentDetails,
  updateRestaurent,
} from "../../redux/thunks/RestaurentThunks";
import { API_STATE } from "../../utils/constants/common";
import { ViewActionTypes } from "../../utils/constants/CompanyConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import { restaurentSchema, restaurentUISchema } from "./RestaurentSchema";

interface Props extends LocationProps {
  restaurentDetails: RestaurentInterface;
  restaurentDetailsError: null | AxiosError;
  restaurentDetailsLoadingState: string;
  restaurentUpdateError: null | AxiosError;
  restaurentUpdateLoadingState: string;
  fetchRestaurentDetails(_id: string): void;
  updateRestaurent(restaurent: RestaurentInterface, history: H.History): void;
}

const mapStateToProps = (state: {
  restaurentReducer: RestaurentStoreState;
}) => {
  const { restaurentDetails, restaurentUpdate } = state.restaurentReducer;
  return {
    restaurentDetails: restaurentDetails.data.restaurentDetails,
    restaurentDetailsError: restaurentDetails.error,
    restaurentDetailsLoadingState: restaurentDetails.state,
    restaurentUpdateError: restaurentUpdate.error,
    restaurentUpdateLoadingState: restaurentUpdate.state,
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
    updateRestaurent: (restaurent: RestaurentInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateRestaurent(restaurent, history));
    },
  };
};

class RestaurentView extends React.Component<Props> {
  componentDidMount(): void {
    const { restaurentId } = this.props.match.params as any;
    this.props.fetchRestaurentDetails(encodeURIComponent(restaurentId));
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    this.props.updateRestaurent(event.formData, this.props.history);
  };

  isLoading = (): boolean => {
    return (
      this.props.restaurentDetailsLoadingState === API_STATE.LOADING ||
      this.props.restaurentUpdateLoadingState === API_STATE.LOADING
    );
  };

  render() {
    const {
      restaurentDetailsLoadingState,
      restaurentDetails,
      restaurentDetailsError,
      restaurentUpdateLoadingState,
      restaurentUpdateError,
      location,
    } = this.props;
    const viewAction = new URLSearchParams(location.search).get("viewAction");
    const currentUser = getUser();
    const canEditRestaurent = currentUser?.permissions.includes(
      "editRestaurent"
    );
    const canViewRestaurent = currentUser?.permissions.includes(
      "viewRestaurent"
    );

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
        {restaurentUpdateLoadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(restaurentUpdateError)} />
        )}
        {restaurentDetailsLoadingState === API_STATE.DONE &&
          (restaurentUpdateLoadingState === API_STATE.DONE ||
            restaurentUpdateLoadingState === API_STATE.ERROR) && (
            <>
              {viewAction === ViewActionTypes.EDIT && canEditRestaurent && (
                <Row className="w-100 justify-content-start pl-1">
                  <Col md="4">
                    <Form
                      id="restaurent-view-form"
                      schema={restaurentSchema}
                      uiSchema={restaurentUISchema}
                      formData={restaurentDetails}
                      showErrorList={false}
                      onSubmit={this.onSubmit}
                      noHtml5Validate
                    />
                  </Col>
                </Row>
              )}
              {viewAction === ViewActionTypes.VIEW &&
                canViewRestaurent &&
                restaurentDetails && (
                  <Row className="w-100 justify-content-start pl-5">
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
