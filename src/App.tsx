// import * as H from "history";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/auth/Login";
import SignOut from "./components/auth/SignOut";
import NotFound from "./components/common/NotFound";
import CompanyList from "./components/companies/CompanyList";
import CompanyView from "./components/companies/CompanyView";
import Dashboard from "./components/dashboards/Dashboard";
import AuthRoute from "./components/hoc/AuthRoutes";
import ProtectedRoute from "./components/hoc/ProtectedRoute";

class AppComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Switch>
            {/* <ProtectedRoute exact path="/admins" component={AdminDashboard} /> */}
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signOut" component={SignOut} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />

            <ProtectedRoute exact path="/companies" component={CompanyList} />
            <ProtectedRoute
              exact
              path="/companies/view/:companyId"
              component={CompanyView}
            />
            {/* <ProtectedRoute
              exact
              path="/companies/edit/:companyId"
              component={CompanyEdit}
            /> */}

            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default AppComponent;
