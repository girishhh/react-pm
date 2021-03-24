import { AxiosError } from "axios";
import classnames from "classnames";
import * as H from "history";
import React, { CSSProperties, Dispatch, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  MenuAction,
  MenuInterface,
  MenuStoreState,
} from "../../interfaces/MenuInterface";
import {
  RestaurentInterface,
  RestaurentStoreState,
} from "../../interfaces/RestaurentInterface";
import { activateMenu, fetchMenuList } from "../../redux/thunks/MenuThunks";
import { fetchRestaurentDetails } from "../../redux/thunks/RestaurentThunks";
import { API_STATE } from "../../utils/constants/common";
import { formatResponseErrors } from "../../utils/helpers/CommonHelper";
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
  ): Promise<MenuInterface[]>;
  menuListTotal: number;
  restaurentDetails: RestaurentInterface;
  restaurentDetailsError: null | AxiosError;
  restaurentDetailsState: string;
  fetchRestaurentDetails(_id: string): void;
  activateMenuError: null | AxiosError;
  activateMenuState: string;
  activateMenu(_id: string, restaurentId: string, history: H.History): void;
}

const mapStateToProps = (state: {
  menuReducer: MenuStoreState;
  restaurentReducer: RestaurentStoreState;
}) => {
  const { menuList } = state.menuReducer;
  const { restaurentDetails } = state.restaurentReducer;
  return {
    menuList: menuList.data.menuList,
    menuListTotal: menuList.data.total,
    menuListError: menuList.error,
    menuListState: menuList.state,
    restaurentDetails: restaurentDetails.data.restaurentDetails,
    restaurentDetailsError: restaurentDetails.error,
    restaurentDetailsState: restaurentDetails.state,
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
      return (menuList as unknown) as MenuInterface[];
    },
    fetchRestaurentDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchRestaurentDetails({ _id }));
    },
    activateMenu: (_id: string, restaurentId: string, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(activateMenu(_id, restaurentId, history));
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
  restaurentDetails,
  restaurentDetailsError,
  restaurentDetailsState,
  fetchRestaurentDetails,
  activateMenu,
  activateMenuError,
  activateMenuState,
  history,
}) => {
  const { restaurentId } = match.params as any;
  const conditions = { restaurent: { eq: restaurentId } };
  const [columnCount, setColumnCount] = useState(3);

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
      <div style={{ ...style }} className="p-3">
        <Card
          style={{ minHeight: "150px" }}
          className={classnames({
            "menu-active": menuData?._id === restaurentDetails?.activeMenu,
          })}
        >
          <Card.Header>
            {menuData && (
              <Row>
                <Col>
                  <Link
                    className="float-left"
                    to={`menus/${menuData._id}/edit`}
                    replace
                  >
                    edit
                  </Link>
                </Col>
                <Col>
                  {menuData?._id !== restaurentDetails?.activeMenu && (
                    <Button
                      className="float-right"
                      variant="link"
                      onClick={() =>
                        activateMenu(menuData._id, restaurentId, history)
                      }
                    >
                      Activate
                    </Button>
                  )}
                </Col>
              </Row>
            )}
          </Card.Header>
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

  const onResize = (width: number): void => {
    if (width < 768) {
      setColumnCount(1);
    } else {
      setColumnCount(3);
    }
  };

  useEffect(() => {
    fetchRestaurentDetails(restaurentId);
  }, []);

  const isLoading = (): boolean => {
    return (
      menuListState === API_STATE.LOADING ||
      restaurentDetailsState === API_STATE.LOADING ||
      activateMenuState === API_STATE.LOADING
    );
  };

  const isError = (): boolean => {
    return (
      menuListState === API_STATE.ERROR ||
      restaurentDetailsState === API_STATE.ERROR ||
      activateMenuState === API_STATE.ERROR
    );
  };

  return (
    <Row className="menu-list d-flex w-100 mx-0">
      <Col className="px-0">
        <Row>
          {isError() && (
            <>
              <ApiError errors={[menuListError?.response?.data.message]} />
              <ApiError errors={formatResponseErrors(restaurentDetailsError)} />
              <ApiError errors={formatResponseErrors(activateMenuError)} />
            </>
          )}
        </Row>
        {isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}

        <Row className="float-right create-menu">
          <Link to={`/restaurents/${restaurentId}/menus/create`}>
            Create Menu
          </Link>
        </Row>
        {restaurentDetailsState !== API_STATE.LOADING && (
          <Row className="w-100 mx-0">
            <GridInfiniteLoader
              listData={menuList}
              isLoading={menuListState === API_STATE.LOADING}
              columnCount={columnCount}
              cellData={cellData}
              fetchList={fetchMenuList}
              totalRecords={menuListTotal}
              fetchConditon={JSON.stringify(conditions)}
              onResize={onResize}
            />
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<MenuProps>(MenuList));
