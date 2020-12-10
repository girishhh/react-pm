import React from "react";
import { RoleInterface } from "../../interfaces/RoleInterface";
import { getUser } from "../../utils/helpers/AuthHelper";
import { hasRole } from "../../utils/helpers/CommonHelper";
import secureDomain from "../hoc/SecureDomain";
import AdminDashboard from "./AdminDashboard";

class Dashboard extends React.Component {
  render() {
    const user = getUser();
    return (
      <>
        {hasRole(user?.roles as RoleInterface[], "admin") && <AdminDashboard />}
      </>
    );
  }
}

export default secureDomain(Dashboard);
