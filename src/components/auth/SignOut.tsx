import React from "react";
import { LocationProps } from "../../interfaces/CommonInterface";
import { signOut } from "../../utils/helpers/AuthHelper";
import secureDomain from "../hoc/SecureDomain";

class SignOut extends React.Component<LocationProps> {
  render() {
    signOut();
    this.props.history.push("/dashboard");
    return <></>;
  }
}

export default secureDomain(SignOut);
