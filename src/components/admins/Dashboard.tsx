import React from "react";
import secureDomain from "../hoc/SecureDomain";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <h1>Admin Dashboard</h1>
      </>
    );
  }
}

export default secureDomain(Dashboard);
