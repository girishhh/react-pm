//@ts-nocheck
import { AxiosError } from "axios";
import React, { CSSProperties, Dispatch } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  MenuAction,
  MenuInterface,
  MenuStoreState,
} from "../../interfaces/MenuInterface";
import { fetchMenuList } from "../../redux/thunks/MenuThunks";
import { API_STATE } from "../../utils/constants/common";
import { getUser } from "../../utils/helpers/AuthHelper";
import ApiError from "../common/ApiErrors";
import GridInfiniteLoader from "../common/GridInfiniteLoader";
import secureDomain from "../hoc/SecureDomain";
import "./MenuList.scss";

interface MenuProps extends LocationProps {
  menuList: MenuInterface[];
  menuListError: null | AxiosError;
  menuListState: string;
  fetchMenuList(
    start: number,
    limit: number,
    conditions: string
  ): (dispatch: React.Dispatch<MenuAction>) => Promise<MenuInterface[]>;
  menuListTotal: number;
}

const mapStateToProps = (state: { menuReducer: MenuStoreState }) => {
  const { menuList } = state.menuReducer;
  return {
    menuList: menuList.data.menuList,
    menuListTotal: menuList.data.total,
    menuListError: menuList.error,
    menuListState: menuList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<MenuAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchMenuList: async (start: number, limit: number, conditions: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      const menuList = await thunkDispatch(
        fetchMenuList({ start, limit, conditions })
      );
      return menuList;
    },
  };
};

const MenuList: React.FC<MenuProps> = ({
  match,
  menuList,
  menuListError,
  menuListState,
  fetchMenuList,
  menuListTotal,
}) => {
  const cellData = (
    list: MenuInterface[],
    row: number,
    col: number,
    colCount: number,
    style: CSSProperties,
    totalRecords: number
  ) => {
    const cellIndex = row * colCount + col;
    if (list && cellIndex > totalRecords - 1) return <></>;
    const menuData = list && list[row * colCount + col];
    return (
      <div style={{ ...style, padding: "40px" }}>
        <Card style={{ minHeight: "100px" }}>
          <Card.Body>
            <Card.Title>{menuData && menuData.name}</Card.Title>
            <Card.Text>
              <span>{menuData && menuData.name}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const { restaurentId } = match.params as any;

  const conditions = { restaurent: { eq: restaurentId } };

  return (
    <div className="menu-list d-flex">
      <Row className="w-100 mx-0">
        <Col>
          {menuListState === API_STATE.ERROR && (
            <ApiError errors={[menuListError?.response?.data.message]} />
          )}

          <GridInfiniteLoader
            listData={menuList}
            isLoading={menuListState === API_STATE.LOADING}
            columnCount={3}
            cellData={cellData}
            fetchList={fetchMenuList}
            totalRecords={menuListTotal}
            fetchConditon={JSON.stringify(conditions)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<MenuProps>(MenuList));
