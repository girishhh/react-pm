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
import { createRestaurent } from "../../redux/thunks/RestaurentThunks";
import { API_STATE } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import GooglePlacesAutoComplete from "../common/GooglePlacesAutoComplete";
import secureDomain from "../hoc/SecureDomain";
import RenderGooglePlaces from "./RenderGooglePlaces";
import { restaurentSchema, restaurentUISchema } from "./RestaurentSchema";

interface Props extends LocationProps {
  restaurentCreate: RestaurentInterface;
  restaurentCreateError: null | AxiosError;
  restaurentCreateLoadingState: string;
  createRestaurent(restaurent: RestaurentInterface, history: H.History): void;
}

interface State {
  formData: RestaurentInterface | {};
}

const mapStateToProps = (state: {
  restaurentReducer: RestaurentStoreState;
}) => {
  const { restaurentCreate } = state.restaurentReducer;
  return {
    restaurentCreate: restaurentCreate.data.restaurentCreate,
    restaurentCreateError: restaurentCreate.error,
    restaurentCreateLoadingState: restaurentCreate.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RestaurentAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createRestaurent: (restaurent: RestaurentInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createRestaurent(restaurent, history));
    },
  };
};

class RestaurentCreate extends React.Component<Props, State> {
  state = { formData: {} };

  onSubmit = (event: ISubmitEvent<any>) => {
    console.log("EVENT FORM DATA", event.formData);
    const formData = event.formData;
    formData.lat = formData.google_auto_place.lat;
    formData.lng = formData.google_auto_place.lng;
    formData.geo_location_description =
      formData.google_auto_place.formatted_address;
    delete formData.google_auto_place;
    this.setState({ formData: formData });
    console.log("FORRRRRRRRRRR", formData);
    // this.props.createRestaurent(event.formData, this.props.history);
  };

  render() {
    const { restaurentCreateLoadingState, restaurentCreateError } = this.props;

    const fields = {
      geo: RenderGooglePlaces,
    };

    return (
      <div className="restaurent-create">
        {restaurentCreateLoadingState === API_STATE.LOADING && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {restaurentCreateLoadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(restaurentCreateError)} />
        )}
        {(restaurentCreateLoadingState === API_STATE.DONE ||
          restaurentCreateLoadingState === API_STATE.ERROR) && (
          <Row className="w-100 justify-content-start pl-1">
            <Col md="4">
              <Form
                id="restaurent-view-form"
                schema={restaurentSchema}
                uiSchema={restaurentUISchema}
                formData={this.state.formData}
                //@ts-ignore
                fields={fields}
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
)(secureDomain<Props>(RestaurentCreate));
