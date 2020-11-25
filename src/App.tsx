// import * as H from "history";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminDashboard from "./components/admins/Dashboard";
import Login from "./components/auth/Login";
import NotFound from "./components/common/NotFound";
import Dashboard from "./components/Dashboard";
import AuthRoute from "./components/hoc/AuthRoutes";
import ProtectedRoute from "./components/hoc/ProtectedRoute";
import "./App.scss";

class AppComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Switch>
            <ProtectedRoute exact path="/admins" component={AdminDashboard} />
            <AuthRoute exact path="/login" component={Login} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <Route path="*" component={NotFound} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default AppComponent;
