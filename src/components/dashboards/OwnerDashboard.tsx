import React from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ROLES } from "../../utils/constants/RoleConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import secureDomain from "../hoc/SecureDomain";

class OwnerDashboard extends React.Component {
  render() {
    const user = getUser();
    return (
      <Row className="pt-2">
        <Col className="text-center">
          <NavLink to="/restaurents">Restaurents</NavLink>
        </Col>
        <Col className="text-center">
          <NavLink to={`/users/create/?role=${ROLES.DELIVERY_BOY}`}>
            DeliveryBoy List
          </NavLink>
        </Col>
        <Col className="text-center">
          <NavLink to={`/food-categories`}>FoodCategories</NavLink>
        </Col>
      </Row>
    );
  }
}

export default secureDomain(OwnerDashboard);
