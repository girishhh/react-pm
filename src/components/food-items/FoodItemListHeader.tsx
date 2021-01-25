import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  restaurentId: string;
}

const FoodItemListHeader: React.FC<Props> = ({ restaurentId }) => {
  return (
    <div className="d-flex">
      <div className="justify-content-center w-100 pl-5">FoodItem List</div>
      <div className="pr-5">
        <NavLink to={`/restaurents/${restaurentId}/food-items/create`}>
          Create
        </NavLink>
      </div>
    </div>
  );
};

export default FoodItemListHeader;
