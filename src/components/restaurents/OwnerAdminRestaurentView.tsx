import React from "react";
import { Row, Col } from "react-bootstrap";
import { RestaurentInterface } from "../../interfaces/RestaurentInterface";
import { NavLink } from "react-router-dom";
import { getUser } from "../../utils/helpers/AuthHelper";

interface Props {
  restaurentDetails: RestaurentInterface;
}

const OwnerAdminRestaurentView: React.FC<Props> = ({ restaurentDetails }) => {
  const currentUser = getUser();
  const canViewFoodItemList = currentUser?.permissions.includes(
    "viewFoodItemList"
  );
  return (
    <div className="pl-5">
      <Row className="w-100 justify-content-start">
        <Row className="w-100">RestaurentName</Row>
        <Row className="w-100">{restaurentDetails.name}</Row>

        <Row className="w-100 pt-3">Latitude</Row>
        <Row className="w-100">{restaurentDetails.lat}</Row>

        <Row className="w-100 pt-3">Longitude</Row>
        <Row className="w-100">{restaurentDetails.lng}</Row>

        <Row className="w-100 pt-3">Geo Location</Row>
        <Row className="w-100">
          {restaurentDetails.geo_location_description}
        </Row>
      </Row>
      <Row className="w-100 justify-content-start">
        {canViewFoodItemList && (
          <Row className="pt-3 w-100">
            <Col md="2" className="pl-0">
              <NavLink to={`/restaurents/${restaurentDetails._id}/food-items`}>
                View FoodItems
              </NavLink>
            </Col>
            <Col md="2" className="pl-0">
              <NavLink to={`/restaurents/${restaurentDetails._id}/menus`}>
                View Menus
              </NavLink>
            </Col>
            <Col md="2" className="pl-0">
              <NavLink to={`/restaurents/${restaurentDetails._id}/menu-items`}>
                View MenuItems
              </NavLink>
            </Col>
          </Row>
        )}
      </Row>
    </div>
  );
};

export default OwnerAdminRestaurentView;
