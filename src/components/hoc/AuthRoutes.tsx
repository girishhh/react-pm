import React from "react";
import { Route, RouteComponentProps, RouteProps } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

const AuthRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<{}>) => (
        <AuthLayout>
          <Component {...props} />
        </AuthLayout>
      )}
    />
  );
};

export default AuthRoute;
