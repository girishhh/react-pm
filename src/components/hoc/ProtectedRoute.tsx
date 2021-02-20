import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { isLoggedIn } from "../../utils/helpers/AuthHelper";
import AuthLayout from "../layout/AuthLayout";
import DefaultLayout from "../layout/DefaultLayout";

const ProtectedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        isLoggedIn() ? (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        ) : (
          <AuthLayout>
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          </AuthLayout>
        )
      }
    />
  );
};

export default ProtectedRoute;
