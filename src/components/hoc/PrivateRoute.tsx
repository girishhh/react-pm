import React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";

const ProtectedRoute: React.SFC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) {
    return null;
  }
  const isLoggedIn = true; // Add your provider here
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<{}>) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
