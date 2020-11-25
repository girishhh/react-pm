import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Session } from "../../interfaces/CommonInterface";
import {
  LoginAction,
  LoginPayload,
  LoginState,
} from "../../interfaces/LoginInterface";
import { login } from "../../redux/thunks/auth/login";
import secureDomain from "../hoc/SecureDomain";

const mapStateToProps = (state: { loginReducer: LoginState }) => {
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
      thunkDispatch(login(payload));
    },
  };
};

interface LoginProps {
  session: Session;
  login(payload: LoginPayload): void;
  error: null | object;
  loadingState: string;
}

class Login extends React.Component<LoginProps> {
  render() {
    const { login, session, loadingState, error } = this.props;
    console.log("OBJJJJJJJJ", loadingState, error);
    const invokeLogin = () => {
      login({ email: "customer10@gmail.com", password: "Giri1234@" });
    };
    return (
      <>
        <button onClick={invokeLogin}></button>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<LoginProps>(Login));
