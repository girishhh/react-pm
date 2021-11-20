import { AxiosError } from "axios";
import React, {
  CSSProperties,
  Dispatch,
  useEffect,
  useMemo,
  useState
} from "react";
import { Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CellValue } from "react-table";
import { InfiniteLoader } from "react-virtualized";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  RestaurentAction,
  RestaurentInterface,
  RestaurentStoreState
} from "../../interfaces/RestaurentInterface";
import { fetchRestaurentList } from "../../redux/thunks/RestaurentThunks";
import { API_STATE, TABLE_CONSTANTS } from "../../utils/constants/common";
import { ROLES } from "../../utils/constants/RoleConstants";
import { getUser } from "../../utils/helpers/AuthHelper";
import { hasRole } from "../../utils/helpers/CommonHelper";
import ApiError from "../common/ApiErrors";
import { CommonTable } from "../common/CommonTable";
import InfiniteScroller from "../common/InfiniteScroller";
import secureDomain from "../hoc/SecureDomain";
import "./RestaurentList.scss";
import RestaurentListHeader from "./RestaurentListHeader";
import TableActions from "./TableActions";

interface RestaurentProps extends LocationProps {
  restaurentList: RestaurentInterface[];
  restaurentListError: null | AxiosError;
  restaurentListState: string;
  fetchRestaurentList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<RestaurentInterface[]>;
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
    fetchRestaurentList: async (
      start: number,
      limit: number,
      conditions: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      const restaurentList = await thunkDispatch(
        fetchRestaurentList({ start, limit, conditions })
      );
      return restaurentList as unknown as RestaurentInterface[];
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

  const renderCell = (item: any) => {
    return (
      <div id="restaurent-cell" style={{padding: "40px" }}>
        <Card
          style={{ minHeight: "100px" }}
          onClick={() =>
            history.push(`/restaurents/${item._id}/view`)
          }
        >
          <Card.Body>
            <Card.Title>{item?.name}</Card.Title>
            <Card.Text>
              <span>{ item?.name}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const user = getUser();

  return (
    <div className="restaurent-list d-flex h-100">
      <Row className="w-100 mx-0">
        <Col>
          {restaurentListState === API_STATE.ERROR && (
            <ApiError errors={[restaurentListError?.response?.data.message]} />
          )}
          {(hasRole(user?.roles, ROLES.COMPANY_ADMIN) ||
            hasRole(user?.roles, ROLES.OWNER)) && (
            <CommonTable
              columns={columns}
              data={data}
              fetchData={fetchRestaurentList}
              fetchCondition={getFetchCondition()}
              loading={restaurentListState === API_STATE.LOADING}
              pageCount={pageCount}
              changePageCount={changePageCount}
            />
          )}
          
          {hasRole(user?.roles, ROLES.CUSTOMER) && (            
            <InfiniteScroller
              totalItems={restaurentListTotal}
              fetchData={fetchRestaurentList}
              renderCell={renderCell}
              noOfItemsInRow={3}
              fetchCondition={getFetchCondition()}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<RestaurentProps>(RestaurentList));
