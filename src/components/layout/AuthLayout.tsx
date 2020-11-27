import React from "react";
import { Container } from "react-bootstrap";
import secureDomain from "../hoc/SecureDomain";
import "./AuthLayout.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

class AuthLayout extends React.Component<AuthLayoutProps> {
  render() {
    const { children } = this.props;
    return (
      <Container className="auth-layout" fluid>
        {children}
      </Container>
    );
  }
}

export default secureDomain<AuthLayoutProps>(AuthLayout);
