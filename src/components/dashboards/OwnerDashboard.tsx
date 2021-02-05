import React from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import secureDomain from "../hoc/SecureDomain";

class OwnerDashboard extends React.Component {
  render() {
    return (
      <>
        <Row className="pt-2">
          <Col className="text-center">
            <NavLink to="/restaurents">Restaurents</NavLink>
          </Col>
        </Row>
      </>
    );
  }
}

export default secureDomain(OwnerDashboard);
