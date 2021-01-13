import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  SignUpAction,
  SignUpPayloadTypes,
  SignUpStoreState,
  SignUpSuccessMsg,
} from "../../interfaces/SignUpInterface";
import secureDomain from "../hoc/SecureDomain";
import { ISubmitEvent } from "@rjsf/core";
import {
  formatResponseErrors,
  isAdminDomain,
} from "../../utils/helpers/CommonHelper";
import { ROLES } from "../../utils/constants/RoleConstants";
import { Row, Spinner } from "react-bootstrap";
import { API_STATE } from "../../utils/constants/common";
import { AxiosError } from "axios";
import ApiError from "../common/ApiErrors";
import Form from "@rjsf/bootstrap-4";
import { signUpFormData, signUpSchema, signUpUISchema } from "./SignUpSchema";
import { signUp } from "../../redux/thunks/AuthThunks";
import { LocationProps } from "../../interfaces/CommonInterface";
import { UserInterface } from "../../interfaces/UserInterface";
import { NavLink } from "react-router-dom";

interface Props extends LocationProps {
  signUp(payload: SignUpPayloadTypes): void;
  error: null | AxiosError;
  loadingState: string;
  signUpRespData: SignUpSuccessMsg;
}

const mapStateToProps = (state: { signUpReducer: SignUpStoreState }) => {
  const { signUp } = state.signUpReducer;
  return {
    signUpRespData: signUp.data,
    error: signUp.error,
    loadingState: signUp.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SignUpAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    signUp: (payload: UserInterface) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(signUp(payload));
    },
  };
};

class SignUp extends React.Component<Props> {
  onSubmit = (event: ISubmitEvent<any>) => {
    const formData = event.formData;
    if (isAdminDomain()) formData.roles = [ROLES.ADMIN];
    this.props.signUp(formData);
  };

  render() {
    const { error, loadingState, signUpRespData } = this.props;
    return (
      <div className="h-100 sign-up pl-2">
        {signUpRespData && signUpRespData.message && (
          <Row className="success-msg">{signUpRespData.message}</Row>
        )}
        {loadingState === API_STATE.LOADING && <Spinner animation="border" />}
        {loadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(error)} />
        )}
        {(loadingState === API_STATE.DONE ||
          loadingState === API_STATE.ERROR) && (
          <Row>
            <Form
              id="signup-form"
              schema={signUpSchema}
              uiSchema={signUpUISchema}
              formData={signUpFormData}
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(SignUp));
