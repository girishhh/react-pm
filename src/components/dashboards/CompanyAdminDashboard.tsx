import React from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../../utils/helpers/AuthHelper";
import secureDomain from "../hoc/SecureDomain";

class CompanyAdminDashboard extends React.Component {
  render() {
    const user = getUser();
    return (
      <>
        <NavLink to="/restaurents">Restaurents</NavLink>
      </>
    );
  }
}

export default secureDomain(CompanyAdminDashboard);
