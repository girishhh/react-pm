import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import React, { Dispatch } from "react";
import { Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import { SignUpAction } from "../../interfaces/SignUpInterface";
import {
  CreateUserSuccessMsg,
  UserInterface,
  UserPayloadTypes,
  UserStoreState,
} from "../../interfaces/UserInterface";
import { createUser } from "../../redux/thunks/UserThunks";
import { API_STATE } from "../../utils/constants/common";
import {
  FormDataMapForCreateUser,
  UserRoleURLMapForCreateUser,
} from "../../utils/constants/UserConstants";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import { userSchema, userUISchema } from "./UserSchema";

interface Props extends LocationProps {
  createUser(payload: UserPayloadTypes): void;
  error: null | AxiosError;
  loadingState: string;
  createUserRespData: CreateUserSuccessMsg;
}

interface State {
  formData: UserInterface | {};
}

const mapStateToProps = (state: { userReducer: UserStoreState }) => {
  const { createUser } = state.userReducer;
  return {
    createUserRespData: createUser.data,
    error: createUser.error,
    loadingState: createUser.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<SignUpAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createUser: (payload: UserInterface) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createUser(payload));
    },
  };
};

class UserCreate extends React.Component<Props, State> {
  state = { formData: {} };

  onSubmit = (event: ISubmitEvent<any>) => {
    const formData = event.formData;
    this.setState({ formData });
    const urlSearch = new URLSearchParams(this.props.location.search);
    const role = urlSearch.get("role");
    const id = urlSearch.get(
      UserRoleURLMapForCreateUser[
        role as keyof typeof UserRoleURLMapForCreateUser
      ]
    );
    formData[
      FormDataMapForCreateUser[role as keyof typeof FormDataMapForCreateUser]
    ] = id;
    formData.roles = [role];
    this.props.createUser(formData);
  };

  render() {
    const { error, loadingState, createUserRespData } = this.props;

    return (
      <div className="h-100 user-create pl-4">
        {createUserRespData && createUserRespData.message && (
          <Row className="success-msg">{createUserRespData.message}</Row>
        )}
        {loadingState === API_STATE.LOADING && <Spinner animation="border" />}
        {loadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(error)} />
        )}
        {(loadingState === API_STATE.DONE ||
          loadingState === API_STATE.ERROR) && (
          <Row>
            <Form
              id="user-create-form"
              schema={userSchema}
              uiSchema={userUISchema}
              formData={this.state.formData}
              onSubmit={this.onSubmit}
              showErrorList={false}
              noHtml5Validate
            />
          </Row>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(UserCreate));
