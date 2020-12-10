import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  companyId: string;
}

const TableActions: React.FC<Props> = ({ companyId }) => {
  return (
    <>
      <NavLink
        to={`/companies/view/${companyId}?viewAction=view`}
        className="pr-2"
      >
        view
      </NavLink>
      <NavLink to={`/companies/view/${companyId}?viewAction=edit`}>
        edit
      </NavLink>
    </>
  );
};

export default TableActions;
