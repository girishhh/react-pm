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
    this.props.login({ email, password });
  };

  componentDidUpdate(): void {
    const { session, history } = this.props;
    if (session && session.accessToken) {
      history.push("/dashboard");
    }
  }

  render() {
    const { login, session, loadingState, error } = this.props;

    return (
      <>
        <Row className="h-100 login">
          <Col className="d-flex justify-content-center align-items-center">
            <div className="d-block">
              {loadingState === API_STATE.LOADING && (
                <Spinner animation="border" />
              )}
              {loadingState === API_STATE.ERROR && (
                <ApiError errors={[error?.response?.data.message]} />
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
