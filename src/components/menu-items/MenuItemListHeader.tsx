import React from "react";
import { NavLink } from "react-router-dom";

const MenuItemListHeader: React.FC<{ restaurentId: string }> = ({
  restaurentId,
}) => {
  return (
    <div className="d-flex">
      <div className="justify-content-center w-100 pl-5">MenuItem List</div>
      <div className="pr-5">
        <NavLink to={`/restaurents/${restaurentId}/menu-items/create`}>
          Create
        </NavLink>
      </div>
    </div>
  );
};

export default MenuItemListHeader;
