import Form from "@rjsf/bootstrap-4";
import { AxiosError } from "axios";
import React, { Dispatch } from "react";
import { Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { ISubmitEvent } from "@rjsf/core";
import {
  ActivateAccountAction,
  ActivateAccountPayload,
  ActivateAccountStoreState,
  ActivateAccountSuccessMsg,
} from "../../interfaces/ActivateAccountInterface";
import { LocationProps } from "../../interfaces/CommonInterface";
import { activateAccount } from "../../redux/thunks/AuthThunks";
import { AllowedTokenTypes } from "../../utils/constants/AuthConstants";
import { API_STATE } from "../../utils/constants/common";
import { UserActivationConstants } from "../../utils/constants/UserConstants";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import {
  passwordFormData,
  passwordSchema,
  passwordUISchema,
  validatePassword,
} from "./PasswordSchema";
import classNames from "classnames";

interface Props extends LocationProps {
  activateAccount(payload: ActivateAccountPayload, type: string): void;
  error: null | AxiosError;
  loadingState: string;
  activateAccountRespData: ActivateAccountSuccessMsg;
}

const mapStateToProps = (state: {
  activateAccountReducer: ActivateAccountStoreState;
}) => {
  const { activateAccount } = state.activateAccountReducer;
  return {
    activateAccountRespData: activateAccount.data,
    error: activateAccount.error,
    loadingState: activateAccount.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ActivateAccountAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    activateAccount: (payload: ActivateAccountPayload, type: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(activateAccount(payload, type));
    },
  };
};

class ActivateAccount extends React.Component<Props> {
  type: string;
  token: string;
  constructor(props: Props) {
    super(props);
    this.token = "";
    this.type = "";
  }
  componentDidMount(): void {
    if (this.type === UserActivationConstants.CONFIRMATION)
      this.props.activateAccount({ token: this.token }, this.type);
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    const formData = event.formData;
    this.props.activateAccount(
      { token: this.token, password: formData.password },
      this.type
    );
  };

  render() {
    const {
      error,
      loadingState,
      activateAccountRespData,
      history,
    } = this.props;
    const urlSearchParam = new URLSearchParams(this.props.location.search);
    this.type = urlSearchParam.get("type") as string;
    this.token = urlSearchParam.get("token") as string;
    const navLinkItem = (
      <span
        className={classNames("pt-1 d-flex", {
          "pl-2": this.type === UserActivationConstants.CONFIRMATION,
        })}
      >
        Back to
        <NavLink to="/login" className="pl-2">
          Login
        </NavLink>
      </span>
    );
    if (!AllowedTokenTypes.includes(this.type)) {
      history.push("/404");
      return <></>;
    }
    return (
      <div className="h-100 activate-account d-flex justify-content-center align-items-center">
        <div className="d-block">
          {activateAccountRespData && activateAccountRespData.message && (
            <>
              <Row
                className={classNames("success-msg", {
                  "pl-2": this.type === UserActivationConstants.CONFIRMATION,
                })}
              >
                {activateAccountRespData.message}
              </Row>
            </>
          )}
          {loadingState === API_STATE.LOADING && <Spinner animation="border" />}
          {loadingState === API_STATE.ERROR && (
            <>
              <ApiError errors={formatResponseErrors(error)} />
            </>
          )}
          {this.type === UserActivationConstants.PASSWORD &&
            (loadingState === API_STATE.DONE ||
              loadingState === API_STATE.ERROR) && (
              <Row>
                <Form
                  id="activate-account-form"
                  schema={passwordSchema}
                  uiSchema={passwordUISchema}
                  formData={passwordFormData}
                  onSubmit={this.onSubmit}
                  showErrorList={false}
                  validate={validatePassword}
                  noHtml5Validate
                />
              </Row>
            )}
          <Row className="pt-2">{navLinkItem}</Row>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(ActivateAccount));
