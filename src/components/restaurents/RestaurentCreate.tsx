import Form, { AjvError, ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import { default as loadash, default as lodash } from "lodash";
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
  createRestaurent,
  fetchRestaurentDetails,
  updateRestaurent,
} from "../../redux/thunks/RestaurentThunks";
import { API_STATE } from "../../utils/constants/common";
import { ViewActionTypes } from "../../utils/constants/common";
import { EDIT_PATH } from "../../utils/constants/RestaurentConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import LatTextInput from "./LatTextInput";
import RenderGooglePlaces from "./RenderGooglePlaces";
import { restaurentSchema, restaurentUISchema } from "./RestaurentSchema";

interface Props extends LocationProps {
  restaurentCreate: RestaurentInterface;
  restaurentCreateError: null | AxiosError;
  restaurentCreateLoadingState: string;
  createRestaurent(restaurent: RestaurentInterface, history: H.History): void;
  restaurentUpdateError: null | AxiosError;
  restaurentUpdateLoadingState: string;
  updateRestaurent(restaurent: RestaurentInterface, history: H.History): void;
  restaurentDetails: RestaurentInterface;
  restaurentDetailsError: null | AxiosError;
  restaurentDetailsLoadingState: string;
  fetchRestaurentDetails(_id: string): void;
}

interface FormContext {
  geo_location_required_error: boolean;
}

interface State {
  formData: RestaurentInterface | {};
  formContext: FormContext;
}

const mapStateToProps = (state: {
  restaurentReducer: RestaurentStoreState;
}) => {
  const {
    restaurentCreate,
    restaurentDetails,
    restaurentUpdate,
  } = state.restaurentReducer;
  return {
    restaurentCreate: restaurentCreate.data.restaurentCreate,
    restaurentCreateError: restaurentCreate.error,
    restaurentCreateLoadingState: restaurentCreate.state,
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
    createRestaurent: (restaurent: RestaurentInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createRestaurent(restaurent, history));
    },
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

class RestaurentCreate extends React.Component<Props, State> {
  state = {
    formData: { name: undefined, lat: 0, lng: 0, geo_location_description: {} },
    formContext: { geo_location_required_error: false },
  };
  canEditRestaurent: boolean;
  viewAction: string;

  constructor(props: Props) {
    super(props);
    const { restaurentId } = this.props.match.params as any;
    this.viewAction =
      restaurentId && EDIT_PATH.test(props.location.pathname)
        ? ViewActionTypes.EDIT
        : ViewActionTypes.CREATE;
    const currentUser = getUser();
    this.canEditRestaurent = currentUser?.permissions.includes(
      "editRestaurent"
    ) as boolean;
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    const formData = event.formData;
    formData.geo_location_description =
      formData.geo_location_description.formatted_address;
    if (this.viewAction === ViewActionTypes.EDIT) {
      this.props.updateRestaurent(formData, this.props.history);
    } else {
      this.props.createRestaurent(formData, this.props.history);
    }
  };

  onChange = (event: ISubmitEvent<any>) => {
    const formData = loadash.cloneDeep(event.formData);
    if (
      !lodash.isEmpty(formData.geo_location_description) &&
      this.state.formData.lat !== formData.geo_location_description.lat &&
      this.state.formData.lng !== formData.geo_location_description.lng
    ) {
      formData.lat = formData.geo_location_description.lat;
      formData.lng = formData.geo_location_description.lng;
      this.setState({ formData: formData });
    }
  };

  onError = (errors: AjvError[]) => {
    let geo_location_required_error = false;
    for (let i = 0; i < errors.length; i++) {
      if (
        errors[i].property === ".geo_location_description.formatted_address"
      ) {
        geo_location_required_error = true;
        break;
      }
    }
    if (geo_location_required_error) {
      this.setState({ formContext: { geo_location_required_error } });
    } else {
      this.setState({ formContext: { geo_location_required_error: false } });
    }
  };

  componentDidMount(): void {
    if (this.viewAction === ViewActionTypes.EDIT) {
      const { restaurentId } = this.props.match.params as any;
      this.props.fetchRestaurentDetails(encodeURIComponent(restaurentId));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.viewAction === ViewActionTypes.EDIT &&
      this.props.restaurentDetails &&
      !loadash.isEqual(
        prevProps.restaurentDetails,
        this.props.restaurentDetails
      )
    ) {
      const { restaurentDetails } = this.props;
      this.setState({
        formData: {
          ...restaurentDetails,
          geo_location_description: {
            lat: restaurentDetails.lat,
            lng: restaurentDetails.lng,
            formatted_address: restaurentDetails.geo_location_description,
          },
        },
      });
    }
  }

  isLoading(): boolean {
    return (
      this.props.restaurentDetailsLoadingState === API_STATE.LOADING ||
      this.props.restaurentUpdateLoadingState === API_STATE.LOADING ||
      this.props.restaurentCreateLoadingState === API_STATE.LOADING
    );
  }

  isError(): boolean {
    return (
      this.props.restaurentDetailsLoadingState === API_STATE.ERROR ||
      this.props.restaurentUpdateLoadingState === API_STATE.ERROR ||
      this.props.restaurentCreateLoadingState === API_STATE.ERROR
    );
  }

  render() {
    const {
      restaurentCreateError,
      restaurentDetailsError,
      restaurentUpdateError,
    } = this.props;

    const fields = {
      geo: RenderGooglePlaces,
      kar: LatTextInput,
    };

    return (
      <div className="restaurent-create">
        {this.isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {this.isError() && (
          <>
            <ApiError errors={formatResponseErrors(restaurentCreateError)} />
            <ApiError errors={formatResponseErrors(restaurentDetailsError)} />
            <ApiError errors={formatResponseErrors(restaurentUpdateError)} />
          </>
        )}
        {!this.isLoading() && (
          <Row className="w-100 justify-content-start pl-1">
            <Col md="4">
              <Form
                id="restaurent-view-form"
                schema={restaurentSchema}
                uiSchema={restaurentUISchema}
                formContext={this.state.formContext}
                formData={this.state.formData}
                //@ts-ignore
                fields={fields}
                showErrorList={false}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
                onError={this.onError}
                //@ts-ignore
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
