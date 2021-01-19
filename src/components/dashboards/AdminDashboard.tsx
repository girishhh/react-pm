import React from "react";
import { NavLink } from "react-router-dom";
import { ROLES } from "../../utils/constants/RoleConstants";

const AdminDashboard: React.FC = () => {
  return (
    <>
      <NavLink to="/companies">Companies</NavLink>
    </>
  );
};

export default AdminDashboard;
