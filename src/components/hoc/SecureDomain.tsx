import { parseDomain } from "parse-domain/build-esm/src/parse-domain";
import React, { ComponentClass, ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { ALLOWED_SUB_DOMAINS } from "../../utils/constants/common";

function secureDomain<P>(
  WrappedComponent: ComponentType<P>
): ComponentClass<P> {
  return class SecureDomain extends React.Component {
    render() {
      const parsedResult = parseDomain(window.location.host) as any;
      if (ALLOWED_SUB_DOMAINS.includes(parsedResult.subDomains[0])) {
        return <WrappedComponent {...(this.props as P)} />;
      } else {
        return <Redirect to="/404" />;
      }
    }
  } as ComponentClass<P>;
}

export default secureDomain;
