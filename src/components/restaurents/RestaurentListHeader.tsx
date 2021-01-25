import React from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../../utils/helpers/AuthHelper";

const RestaurentListHeader: React.FC = () => {
  return (
    <div className="d-flex">
      <div className="justify-content-center w-100 pl-5">Restaurent List</div>
      <div className="pr-5">
        {getUser()?.permissions.includes("createRestaurent") && (
          <NavLink to="/restaurents/create">Create</NavLink>
        )}
      </div>
    </div>
  );
};

export default RestaurentListHeader;
