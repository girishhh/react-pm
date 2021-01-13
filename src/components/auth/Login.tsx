import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps, Session } from "../../interfaces/CommonInterface";
import {
  LoginAction,
  LoginPayload,
  LoginStoreState,
} from "../../interfaces/LoginInterface";
import { fetchSession } from "../../redux/thunks/AuthThunks";
import secureDomain from "../hoc/SecureDomain";
import Form from "@rjsf/bootstrap-4";
import { Row, Col, Spinner } from "react-bootstrap";
import "./Login.scss";
import { loginFormData, loginSchema, loginUISchema } from "./LoginSchema";
import { ISubmitEvent } from "@rjsf/core";
import { API_STATE } from "../../utils/constants/common";
import { AxiosError } from "axios";
import ApiError from "../common/ApiErrors";
import {
  formatResponseErrors,
  isAdminDomain,
} from "../../utils/helpers/CommonHelper";
import { ROLES } from "../../utils/constants/RoleConstants";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state: { loginReducer: LoginStoreState }) => {
  const { login } = state.loginReducer;
  return {
    session: login.data,
    error: login.error,
    loadingState: login.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<LoginAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    login: (payload: LoginPayload) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchSession(payload));
    },
  };
};

interface LoginProps extends LocationProps {
  session: Session;
  login(payload: LoginPayload): void;
  error: null | AxiosError;
  loadingState: string;
}

class Login extends React.Component<LoginProps> {
  onSubmit = (event: ISubmitEvent<any>) => {
    const { email, password } = event.formData;
    const loginData: { email: string; password: string; role?: string } = {
      email,
      password,
    };
    if (isAdminDomain()) loginData.role = ROLES.ADMIN;
    this.props.login(loginData);
  };

  componentDidUpdate(): void {
    const { session, history } = this.props;
    if (session && session.accessToken) {
      history.push("/dashboard");
    }
  }

  render() {
    const { loadingState, error } = this.props;

    return (
      <>
        <Row className="h-100 login">
          <Col className="d-flex justify-content-center align-items-center">
            <div className="d-block">
              {loadingState === API_STATE.LOADING && (
                <Spinner animation="border" />
              )}
              {loadingState === API_STATE.ERROR && (
                <ApiError errors={formatResponseErrors(error)} />
              )}
              {(loadingState === API_STATE.DONE ||
                loadingState === API_STATE.ERROR) && (
                <Form
                  id="login-form"
                  schema={loginSchema}
                  uiSchema={loginUISchema}
                  formData={loginFormData}
                  onSubmit={this.onSubmit}
                  showErrorList={false}
                  noHtml5Validate
                />
              )}
              <span className="pt-2 d-flex">
                Dont have account? please{" "}
                <NavLink to="/signUp" className="pl-2">
                  SignUp
                </NavLink>
              </span>
              <span className="pt-2 d-flex">
                Did not recieve account confirmation instructions?{" "}
                <NavLink to="/users/resend-confirmation" className="pl-2">
                  ReSend Confirmation mail.
                </NavLink>
              </span>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<LoginProps>(Login));
