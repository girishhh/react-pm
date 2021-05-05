// import * as H from "history";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import ActivateAccount from "./components/auth/ActivateAccount";
import Login from "./components/auth/Login";
import ReSendConfirmation from "./components/auth/ReSendConfirmation";
import SignOut from "./components/auth/SignOut";
import SignUp from "./components/auth/SignUp";
import CheckoutDetails from "./components/checkout/CheckoutDetails";
import NotFound from "./components/common/NotFound";
import CompanyCreate from "./components/companies/CompanyCreate";
import CompanyList from "./components/companies/CompanyList";
import CompanyView from "./components/companies/CompanyView";
import Dashboard from "./components/dashboards/Dashboard";
import FoodCategoryCreate from "./components/food-categories/FoodCategoryCreate";
import FoodCategoryList from "./components/food-categories/FoodCategoryList";
import FoodItemCreate from "./components/food-items/FoodItemCreate";
import FoodItemList from "./components/food-items/FoodItemList";
import FoodItemView from "./components/food-items/FoodItemView";
import AuthRoute from "./components/hoc/AuthRoutes";
import ProtectedRoute from "./components/hoc/ProtectedRoute";
import MenuItemCreate from "./components/menu-items/MenuItemCreate";
import MenuItemList from "./components/menu-items/MenuItemList";
import MenuCreate from "./components/menus/MenuCreate";
import MenuList from "./components/menus/MenuList";
import MakePayment from "./components/payment/MakePayment";
import RestaurentCreate from "./components/restaurents/RestaurentCreate";
import RestaurentList from "./components/restaurents/RestaurentList";
import RestaurentView from "./components/restaurents/RestaurentView";
import UserCreate from "./components/users/UserCreate";

class AppComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <ProtectedRoute exact path="/admins" component={AdminDashboard} /> */}
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signOut" component={SignOut} />
          <AuthRoute exact path="/signUp" component={SignUp} />
          <AuthRoute
            exact
            path="/users/activate-account"
            component={ActivateAccount}
          />
          <AuthRoute
            exact
            path="/users/resend-confirmation"
            component={ReSendConfirmation}
          />

          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/users/create" component={UserCreate} />

          <ProtectedRoute exact path="/companies" component={CompanyList} />
          <ProtectedRoute
            exact
            path="/companies/:companyId/view"
            component={CompanyView}
          />
          <ProtectedRoute
            exact
            path="/companies/create"
            component={CompanyCreate}
          />

          <ProtectedRoute
            exact
            path="/restaurents"
            component={RestaurentList}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/view"
            component={RestaurentView}
          />
          <ProtectedRoute
            exact
            path="/restaurents/create"
            component={RestaurentCreate}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/edit"
            component={RestaurentCreate}
          />

          <ProtectedRoute
            exact
            path="/food-categories"
            component={FoodCategoryList}
          />
          <ProtectedRoute
            exact
            path="/food-categories/create"
            component={FoodCategoryCreate}
          />
          <ProtectedRoute
            exact
            path="/food-categories/:foodCategoryId/edit"
            component={FoodCategoryCreate}
          />

          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/food-items"
            component={FoodItemList}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/food-items/:foodItemId/view"
            component={FoodItemView}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/food-items/create"
            component={FoodItemCreate}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/food-items/:foodItemId/edit"
            component={FoodItemCreate}
          />

          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/menu-items"
            component={MenuItemList}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/menu-items/create"
            component={MenuItemCreate}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/menu-items/:menuItemId/edit"
            component={MenuItemCreate}
          />

          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/menus"
            component={MenuList}
          />

          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/menus/create"
            component={MenuCreate}
          />

          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/menus/:menuId/create"
            component={MenuCreate}
          />
          <ProtectedRoute
            exact
            path="/restaurents/:restaurentId/menus/:menuId/edit"
            component={MenuCreate}
          />

          <ProtectedRoute exact path="/checkout" component={CheckoutDetails} />
          <ProtectedRoute exact path="/payment" component={MakePayment} />

          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppComponent;
