import Form from "@rjsf/bootstrap-4";
import { ISubmitEvent } from "@rjsf/core";
import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  CompanyAction,
  CompanyInterface,
  CompanyStoreState,
} from "../../interfaces/CompanyInterface";
import {
  fetchCompanyDetails,
  updateCompany,
} from "../../redux/thunks/CompanyThunks";
import { API_STATE } from "../../utils/constants/common";
import { ViewActionTypes } from "../../utils/constants/common";
import { getUser } from "../../utils/helpers/AuthHelper";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";
import { companySchema, companyUISchema } from "./CompanySchema";

interface Props extends LocationProps {
  companyDetails: CompanyInterface;
  companyDetailsError: null | AxiosError;
  companyDetailsLoadingState: string;
  companyUpdateError: null | AxiosError;
  companyUpdateLoadingState: string;
  fetchCompanyDetails(_id: string): void;
  updateCompany(company: CompanyInterface, history: H.History): void;
}

const mapStateToProps = (state: { companyReducer: CompanyStoreState }) => {
  const { companyDetails, companyUpdate } = state.companyReducer;
  return {
    companyDetails: companyDetails.data.companyDetails,
    companyDetailsError: companyDetails.error,
    companyDetailsLoadingState: companyDetails.state,
    companyUpdateError: companyUpdate.error,
    companyUpdateLoadingState: companyUpdate.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<CompanyAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchCompanyDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchCompanyDetails({ _id }));
    },
    updateCompany: (company: CompanyInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateCompany(company, history));
    },
  };
};

class CompanyView extends React.Component<Props> {
  componentDidMount(): void {
    const { companyId } = this.props.match.params as any;
    this.props.fetchCompanyDetails(encodeURIComponent(companyId));
  }

  onSubmit = (event: ISubmitEvent<any>) => {
    this.props.updateCompany(event.formData, this.props.history);
  };

  isLoading = (): boolean => {
    return (
      this.props.companyDetailsLoadingState === API_STATE.LOADING ||
      this.props.companyUpdateLoadingState === API_STATE.LOADING
    );
  };

  render() {
    const {
      companyDetailsLoadingState,
      companyDetails,
      companyDetailsError,
      companyUpdateLoadingState,
      companyUpdateError,
      location,
    } = this.props;
    const viewAction = new URLSearchParams(location.search).get("viewAction");
    const currentUser = getUser();
    const canEditCompany = currentUser?.permissions.includes("editCompany");
    const canViewCompany = currentUser?.permissions.includes("viewCompany");

    return (
      <div className="company-list">
        {this.isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {companyDetailsLoadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(companyDetailsError)} />
        )}
        {companyUpdateLoadingState === API_STATE.ERROR && (
          <ApiError errors={formatResponseErrors(companyUpdateError)} />
        )}
        {companyDetailsLoadingState === API_STATE.DONE &&
          (companyUpdateLoadingState === API_STATE.DONE ||
            companyUpdateLoadingState === API_STATE.ERROR) && (
            <>
              {viewAction === ViewActionTypes.EDIT && canEditCompany && (
                <Row className="w-100 justify-content-start pl-1">
                  <Col md="4">
                    <Form
                      id="company-view-form"
                      schema={companySchema}
                      uiSchema={companyUISchema}
                      formData={companyDetails}
                      showErrorList={false}
                      onSubmit={this.onSubmit}
                      noHtml5Validate
                    />
                  </Col>
                </Row>
              )}
              {viewAction === ViewActionTypes.VIEW &&
                canViewCompany &&
                companyDetails && (
                  <Row className="w-100 justify-content-start pl-5">
                    <Row className="w-100">CompanyName</Row>
                    <Row className="w-100">{companyDetails.name}</Row>

                    <Row className="w-100 pt-3">SubDomain</Row>
                    <Row className="w-100">{companyDetails.subdomain}</Row>

                    <Row className="w-100 pt-3">City</Row>
                    <Row className="w-100">{companyDetails.city}</Row>

                    <Row className="w-100 pt-3">TimeZone</Row>
                    <Row className="w-100">{companyDetails.timeZone}</Row>

                    <Row className="w-100 pt-3">GST</Row>
                    <Row className="w-100">
                      {companyDetails.paymentCharges?.gst}
                    </Row>
                  </Row>
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
)(secureDomain<Props>(CompanyView));
