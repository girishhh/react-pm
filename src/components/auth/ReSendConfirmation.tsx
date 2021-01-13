import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import React, { Dispatch } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  ReSendConfirmationSuccessMsg,
  UserAction,
  UserStoreState,
} from "../../interfaces/UserInterface";
import { reSendConfirmation } from "../../redux/thunks/UserThunks";
import { API_STATE } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import {
  reSendConfirmnFormData,
  reSendConfirmnSchema,
  reSendConfirmnUISchema,
} from "./ReSendConfirmnSchema";

interface Props extends LocationProps {
  reSendConfirmation(email: string): void;
  error: null | AxiosError;
  loadingState: string;
  respData: ReSendConfirmationSuccessMsg;
}

const mapStateToProps = (state: { userReducer: UserStoreState }) => {
  const { reSendConfirmation } = state.userReducer;
  return {
    respData: reSendConfirmation.data,
    error: reSendConfirmation.error,
    loadingState: reSendConfirmation.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<UserAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    reSendConfirmation: (email: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(reSendConfirmation(email));
    },
  };
};

class ReSendConfirmation extends React.Component<Props> {
  onSubmit = (event: ISubmitEvent<any>) => {
    const formData = event.formData;
    this.props.reSendConfirmation(formData.email);
  };

  render() {
    const { error, loadingState, respData } = this.props;
    return (
      <Row className="h-100 re-send-confirmn pl-2">
        <Col className="d-flex justify-content-center align-items-center">
          <div className="d-block">
            {respData && respData.message && (
              <Row className="success-msg">{respData.message}</Row>
            )}
            {loadingState === API_STATE.LOADING && (
              <Spinner animation="border" />
            )}
            {loadingState === API_STATE.ERROR && (
              <Row>
                <ApiError errors={formatResponseErrors(error)} />
              </Row>
            )}
            {(loadingState === API_STATE.DONE ||
              loadingState === API_STATE.ERROR) && (
              <Row>
                <Form
                  id="resend-confirmn-form"
                  schema={reSendConfirmnSchema}
                  uiSchema={reSendConfirmnUISchema}
                  formData={reSendConfirmnFormData}
                  onSubmit={this.onSubmit}
                  showErrorList={false}
                  noHtml5Validate
                />
              </Row>
            )}
            <Row className="pt-2 d-flex">
              Back to
              <NavLink to="/login" className="pl-2">
                LogIn
              </NavLink>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(ReSendConfirmation));
