import React from "react";
import { NavLink } from "react-router-dom";

const FoodCategoryListHeader: React.FC = () => {
  return (
    <div className="d-flex">
      <div className="justify-content-center w-100 pl-5">FoodCategory List</div>
      <div className="pr-5">
        <NavLink to="/food-categories/create">Create</NavLink>
      </div>
    </div>
  );
};

export default FoodCategoryListHeader;
