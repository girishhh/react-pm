import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  CompanyAction,
  CompanyInterface,
  CompanyStoreState,
} from "../../interfaces/CompanyInterface";
import { createCompany } from "../../redux/thunks/CompanyThunks";
import { API_STATE } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import { companySchema, companyUISchema } from "./CompanySchema";

interface Props extends LocationProps {
  companyCreate: CompanyInterface;
  companyCreateError: null | AxiosError;
  companyCreateLoadingState: string;
  createCompany(company: CompanyInterface, history: H.History): void;
}

interface State {
  formData: CompanyInterface | {};
}

const mapStateToProps = (state: { companyReducer: CompanyStoreState }) => {
  const { companyCreate } = state.companyReducer;
  return {
    companyCreate: companyCreate.data.companyCreate,
    companyCreateError: companyCreate.error,
    companyCreateLoadingState: companyCreate.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<CompanyAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createCompany: (company: CompanyInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createCompany(company, history));
    },
  };
};

class CompanyCreate extends React.Component<Props, State> {
  state = { formData: {} };

  onSubmit = (event: ISubmitEvent<any>) => {
    this.setState({ formData: event.formData });
    this.props.createCompany(event.formData, this.props.history);
  };

  render() {
    const { companyCreateLoadingState, companyCreateError } = this.props;
    return (
      <div className="company-create">
        {companyCreateLoadingState === API_STATE.LOADING && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {companyCreateLoadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(companyCreateError)} />
        )}
        {(companyCreateLoadingState === API_STATE.DONE ||
          companyCreateLoadingState === API_STATE.ERROR) && (
          <Row className="w-100 justify-content-start pl-1">
            <Col md="4">
              <Form
                id="company-view-form"
                schema={companySchema}
                uiSchema={companyUISchema}
                formData={this.state.formData}
                showErrorList={false}
                onSubmit={this.onSubmit}
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
)(secureDomain<Props>(CompanyCreate));
