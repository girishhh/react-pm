import { AxiosError } from "axios";
import React, { Dispatch, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CellValue } from "react-table";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  MenuItemInterface,
  MenuItemStoreState,
  MenuItemAction,
} from "../../interfaces/MenuItemInterface";
import { fetchMenuItemList } from "../../redux/thunks/MenuItemThunks";
import { API_STATE, TABLE_CONSTANTS } from "../../utils/constants/common";
import ApiError from "../common/ApiErrors";
import { CommonTable } from "../common/CommonTable";
import secureDomain from "../hoc/SecureDomain";
import "./MenuItemList.scss";
import MenuItemListHeader from "./MenuItemListHeader";
import TableActions from "./TableActions";

interface MenuItemProps extends LocationProps {
  menuItemList: MenuItemInterface[];
  menuItemListError: null | AxiosError;
  menuItemListState: string;
  fetchMenuItemList(start: number, limit: number, conditions: string): void;
  menuItemListTotal: number;
}

const mapStateToProps = (state: { menuItemReducer: MenuItemStoreState }) => {
  const { menuItemList } = state.menuItemReducer;

  return {
    menuItemList: menuItemList.data.menuItemList,
    menuItemListTotal: menuItemList.data.restaurentMenuItemCount,
    menuItemListError: menuItemList.error,
    menuItemListState: menuItemList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<MenuItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchMenuItemList: (start: number, limit: number, conditions: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchMenuItemList({ start, limit, conditions }));
    },
  };
};

const MenuItemList: React.FC<MenuItemProps> = ({
  menuItemList,
  menuItemListError,
  menuItemListState,
  fetchMenuItemList,
  menuItemListTotal,
  history,
  match,
}) => {
  const [pageCount, setPageCount] = React.useState(0);
  const { restaurentId } = match.params as any;

  const columns = useMemo(
    () => [
      {
        id: "MenuItemList",
        Header: <MenuItemListHeader restaurentId={restaurentId} />,
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Actions",
            accessor: "_id",
            Cell: ({ cell }: { cell: CellValue }) => {
              return cell.render(
                <TableActions
                  restaurentId={restaurentId}
                  menuItemId={cell.value}
                  history={history}
                />
              );
            },
          },
        ],
      },
    ],
    []
  );
  const data = menuItemList && Array.isArray(menuItemList) ? menuItemList : [];

  const changePageCount = (pageSize: number) => {
    const totalPages =
      menuItemListTotal % pageSize == 0
        ? Math.floor(menuItemListTotal / pageSize)
        : Math.floor(menuItemListTotal / pageSize) + 1;
    setPageCount(totalPages);
  };

  useEffect(() => {
    const totalPages =
      menuItemListTotal % TABLE_CONSTANTS.PAGE_SIZE == 0
        ? Math.floor(menuItemListTotal / TABLE_CONSTANTS.PAGE_SIZE)
        : Math.floor(menuItemListTotal / TABLE_CONSTANTS.PAGE_SIZE) + 1;
    setPageCount(totalPages);
  }, [menuItemListTotal]);

  return (
    <div className="menu-item-list d-flex">
      <Row className="w-100 justify-content-start pl-1">
        <Col md="9">
          {menuItemListState === API_STATE.ERROR && (
            <ApiError errors={[menuItemListError?.response?.data.message]} />
          )}
          <CommonTable
            columns={columns}
            data={data}
            fetchCondition={JSON.stringify({
              restaurent: { eq: restaurentId },
            })}
            fetchData={fetchMenuItemList}
            loading={menuItemListState === API_STATE.LOADING}
            pageCount={pageCount}
            changePageCount={changePageCount}
          />
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<MenuItemProps>(MenuItemList));
