import React from "react";
import secureDomain from "../hoc/SecureDomain";
import "./AuthLayout.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

class AuthLayout extends React.Component<AuthLayoutProps> {
  render() {
    const { children } = this.props;
    return <div className="auth-layout">{children}</div>;
  }
}

export default secureDomain<AuthLayoutProps>(AuthLayout);
