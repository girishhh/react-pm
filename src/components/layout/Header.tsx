import React from "react";
import secureDomain from "../hoc/SecureDomain";

class Header extends React.Component {
  render() {
    return <>Header</>;
  }
}

export default secureDomain(Header);
