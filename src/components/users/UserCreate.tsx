import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
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
import { createUser } from "../../redux/thunks/UserThunks";
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
  loadingState: string;
  userCreateRespData: CreateUserSuccessMsg;
}

interface State {
  formData: UserInterface | {};
}

const mapStateToProps = (state: { userReducer: UserStoreState }) => {
  const { userCreate } = state.userReducer;
  return {
    userCreateRespData: userCreate.data,
    error: userCreate.error,
    loadingState: userCreate.state,
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
    const formData = event.formData;
    console.log("FORM DATA", JSON.parse(formData.existingOwner));
  };

  render() {
    const { error, loadingState, userCreateRespData } = this.props;
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
        {loadingState === API_STATE.LOADING && <Spinner animation="border" />}
        {loadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(error)} />
        )}
        {(loadingState === API_STATE.DONE ||
          loadingState === API_STATE.ERROR) && (
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
