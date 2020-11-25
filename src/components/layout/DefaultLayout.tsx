import React from "react";
import secureDomain from "../hoc/SecureDomain";
import Header from "./Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

class DefaultLayout extends React.Component<DefaultLayoutProps> {
  render() {
    const { children } = this.props;
    return (
      <>
        <Header />
        {children}
      </>
    );
  }
}

export default secureDomain<DefaultLayoutProps>(DefaultLayout);
