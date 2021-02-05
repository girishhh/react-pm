import { AxiosError } from "axios";
import React, { CSSProperties, Dispatch, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CellValue } from "react-table";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  RestaurentAction,
  RestaurentInterface,
  RestaurentStoreState,
} from "../../interfaces/RestaurentInterface";
import { fetchRestaurentList } from "../../redux/thunks/RestaurentThunks";
import { API_STATE, TABLE_CONSTANTS } from "../../utils/constants/common";
import { ROLES } from "../../utils/constants/RoleConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { hasRole } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import { CommonTable } from "../common/CommonTable";
import GridInfiniteLoader from "../common/GridInfiniteLoader";
import secureDomain from "../hoc/SecureDomain";
import "./RestaurentList.scss";
import RestaurentListHeader from "./RestaurentListHeader";
import TableActions from "./TableActions";

interface RestaurentProps extends LocationProps {
  restaurentList: RestaurentInterface[];
  restaurentListError: null | AxiosError;
  restaurentListState: string;
  fetchRestaurentList(start: number, limit: number, conditions: string): void;
  restaurentListTotal: number;
}

const mapStateToProps = (state: {
  restaurentReducer: RestaurentStoreState;
}) => {
  const { restaurentList } = state.restaurentReducer;
  return {
    restaurentList: restaurentList.data.restaurentList,
    restaurentListTotal: restaurentList.data.total,
    restaurentListError: restaurentList.error,
    restaurentListState: restaurentList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RestaurentAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchRestaurentList: (start: number, limit: number, conditions: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchRestaurentList({ start, limit, conditions }));
    },
  };
};

const RestaurentList: React.FC<RestaurentProps> = ({
  restaurentList,
  restaurentListError,
  restaurentListState,
  fetchRestaurentList,
  restaurentListTotal,
  history,
}) => {
  const [pageCount, setPageCount] = React.useState(0);

  const columns = useMemo(
    () => [
      {
        id: "RestaurentList",
        Header: <RestaurentListHeader />,
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Latitude",
            accessor: "lat",
          },
          {
            Header: "Longitude",
            accessor: "lng",
          },
          {
            Header: "Geo Location",
            accessor: "geo_location_description",
          },
          ,
          {
            Header: "Actions",
            accessor: "_id",
            Cell: ({ cell }: { cell: CellValue }) => {
              return cell.render(
                <TableActions restaurentId={cell.value} history={history} />
              );
            },
          },
        ],
      },
    ],
    []
  );
  const data =
    restaurentList && Array.isArray(restaurentList) ? restaurentList : [];

  const changePageCount = (pageSize: number) => {
    const totalPages =
      restaurentListTotal % pageSize == 0
        ? Math.floor(restaurentListTotal / pageSize)
        : Math.floor(restaurentListTotal / pageSize) + 1;
    setPageCount(totalPages);
  };

  useEffect(() => {
    const totalPages =
      restaurentListTotal % TABLE_CONSTANTS.PAGE_SIZE == 0
        ? Math.floor(restaurentListTotal / TABLE_CONSTANTS.PAGE_SIZE)
        : Math.floor(restaurentListTotal / TABLE_CONSTANTS.PAGE_SIZE) + 1;
    setPageCount(totalPages);
  }, [restaurentListTotal]);

  const getFetchCondition = (): string => {
    const user = getUser();
    const isOwner = hasRole(user?.roles, ROLES.OWNER);
    return isOwner ? JSON.stringify({ _id: { in: user?.restaurents } }) : "";
  };

  const cellData = (
    list: RestaurentInterface[],
    row: number,
    col: number,
    colCount: number,
    style: CSSProperties
  ) => {
    return (
      <div style={{ ...style, padding: "20px" }}>
        {list && list[row * colCount + col] && list[row * colCount + col].name}
      </div>
    );
  };

  return (
    <div className="restaurent-list d-flex">
      <Row className="w-100 justify-content-start pl-1">
        <Col md="9">
          {restaurentListState === API_STATE.ERROR && (
            <ApiError errors={[restaurentListError?.response?.data.message]} />
          )}
          <CommonTable
            columns={columns}
            data={data}
            fetchData={fetchRestaurentList}
            fetchCondition={getFetchCondition()}
            loading={restaurentListState === API_STATE.LOADING}
            pageCount={pageCount}
            changePageCount={changePageCount}
          />
          {/* <Row className="pt-5">
            <GridInfiniteLoader
              listData={restaurentList}
              isLoading={restaurentListState === API_STATE.LOADING}
              columnCount={3}
              cellData={cellData}
              fetchList={fetchRestaurentList}
              fetchConditon=""
            />
          </Row> */}
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<RestaurentProps>(RestaurentList));
