import React from "react";
import { RoleInterface } from "../../interfaces/RoleInterface";
import { ROLES } from "../../utils/constants/RoleConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { hasRole } from "../../utils/helpers/CommonHelper";
// import GooglePlacesAutoComplete from "../common/GooglePlacesAutoComplete";
import secureDomain from "../hoc/SecureDomain";
import AdminDashboard from "./AdminDashboard";
import CompanyAdminDashboard from "./CompanyAdminDashboard";

class Dashboard extends React.Component {
  render() {
    const user = getUser();
    return (
      <>
        {hasRole(user?.roles as RoleInterface[], ROLES.ADMIN) && (
          <AdminDashboard />
        )}
        {hasRole(user?.roles as RoleInterface[], ROLES.COMPANY_ADMIN) && (
          <CompanyAdminDashboard />
        )}
        {/* <GooglePlacesAutoComplete
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC0P3If-HPI1CyqDwrjqqQMJypGLRjfwlY&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `70%`, display: "none" }} />}
        /> */}
      </>
    );
  }
}

export default secureDomain(Dashboard);
