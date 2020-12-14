import React from "react";
import { Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CompanyListHeader: React.FC = () => {
  return (
    <div className="d-flex">
      <div className="justify-content-center w-100 pl-5">Company List</div>
      <div className="pr-5">
        <NavLink to="/companies/create">Create</NavLink>
      </div>
    </div>
  );
};

export default CompanyListHeader;
