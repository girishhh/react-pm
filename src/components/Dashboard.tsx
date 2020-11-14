import React from "react";
import { NavLink } from "react-router-dom";
import secureDomain from "./hoc/SecureDomain";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <h1> Dashboard</h1>
        <NavLink to="/admins/">admins</NavLink>
      </>
    );
  }
}

export default secureDomain(Dashboard);
