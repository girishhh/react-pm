import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch } from "react";
import { Row, Spinner, Tab, Tabs } from "react-bootstrap";
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
import { createUser, updateUser } from "../../redux/thunks/UserThunks";
import { API_STATE } from "../../utils/constants/common";
import { ROLES } from "../../utils/constants/RoleConstants";
import {
  FormDataMapForCreateUser,
  UserRoleURLMapForCreateUser,
} from "../../utils/constants/UserConstants";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import {
  selectExistingOwnerSchema,
  selectExistingOwnerUISchema,
  userSchema,
  userUISchema,
} from "./UserSchema";
import "./UserCreate.scss";
import UserAutoComplete from "./UserAutoComplete";

interface Props extends LocationProps {
  createUser(payload: UserPayloadTypes): void;
  error: null | AxiosError;
  userCreateLoadingState: string;
  userCreateRespData: CreateUserSuccessMsg;
  userUpdateError: null | AxiosError;
  userUpdateLoadingState: string;
  updateUser(user: UserInterface, history: H.History): void;
}

interface State {
  formData: UserInterface | {};
}

const mapStateToProps = (state: { userReducer: UserStoreState }) => {
  const { userCreate, userUpdate } = state.userReducer;
  return {
    userCreateRespData: userCreate.data,
    error: userCreate.error,
    userCreateLoadingState: userCreate.state,
    userUpdateError: userUpdate.error,
    userUpdateLoadingState: userUpdate.state,
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
    updateUser: (user: UserInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateUser(user, history));
    },
  };
};

class UserCreate extends React.Component<Props, State> {
  state = { formData: {} };
  role: string;

  constructor(props: Props) {
    super(props);
    this.role = "";
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    const formData = event.formData;
    this.setState({ formData });
    const urlSearch = new URLSearchParams(this.props.location.search);
    const id = urlSearch.get(
      UserRoleURLMapForCreateUser[
        this.role as keyof typeof UserRoleURLMapForCreateUser
      ]
    );
    formData[
      FormDataMapForCreateUser[
        this.role as keyof typeof FormDataMapForCreateUser
      ]
    ] = id;
    if (formData.restaurent) {
      formData.restaurents = [formData.restaurent];
      delete formData.restaurent;
    }
    formData.roles = [this.role];
    this.props.createUser(formData);
  };

  onOwnerSubmit = (event: ISubmitEvent<any>) => {
    const formData = JSON.parse(event.formData.existingOwner);
    this.props.updateUser(formData, this.props.history);
  };

  isLoading = (): boolean => {
    return (
      this.props.userCreateLoadingState === API_STATE.LOADING ||
      this.props.userUpdateLoadingState === API_STATE.LOADING
    );
  };

  isError = (): boolean => {
    return (
      this.props.userCreateLoadingState === API_STATE.ERROR ||
      this.props.userUpdateLoadingState === API_STATE.ERROR
    );
  };

  render() {
    const { error, userCreateLoadingState, userCreateRespData } = this.props;
    const urlSearch = new URLSearchParams(this.props.location.search);
    this.role = urlSearch.get("role") as string;
    const restaurentId = urlSearch.get("restaurentId") as string;
    const userForm = (
      <Form
        id="user-create-form"
        schema={
          this.role === ROLES.OWNER
            ? { ...userSchema, title: undefined }
            : userSchema
        }
        uiSchema={userUISchema}
        formData={this.state.formData}
        onSubmit={this.onSubmit}
        showErrorList={false}
        noHtml5Validate
      />
    );
    const fields = { userAutoComplete: UserAutoComplete };

    return (
      <div className="h-100 user-create pl-4">
        {userCreateRespData && userCreateRespData.message && (
          <Row className="success-msg">{userCreateRespData.message}</Row>
        )}
        {this.isLoading() && <Spinner animation="border" />}
        {this.isError() && <ApiError errors={formatResponseErrors(error)} />}
        {!this.isLoading() && (
          <>
            {this.role === ROLES.OWNER ? (
              <>
                <Tabs id="controlled-tab-example" defaultActiveKey="newOwner">
                  <Tab eventKey="newOwner" title="New Owner">
                    {userForm}
                  </Tab>
                  <Tab eventKey="existingOwner" title="Existing Owner">
                    <Form
                      id="owner-select-form"
                      schema={selectExistingOwnerSchema}
                      uiSchema={selectExistingOwnerUISchema}
                      formData={{}}
                      formContext={{ restaurentId }}
                      onSubmit={this.onOwnerSubmit}
                      showErrorList={false}
                      fields={fields}
                      noHtml5Validate
                    />
                  </Tab>
                </Tabs>
              </>
            ) : (
              userForm
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
)(secureDomain<Props>(UserCreate));
