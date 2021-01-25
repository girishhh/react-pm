import { AxiosError } from "axios";
import React, { Dispatch, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CellValue } from "react-table";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  FoodItemAction,
  FoodItemInterface,
  FoodItemStoreState,
} from "../../interfaces/FoodItemInterface";
import { fetchFoodItemList } from "../../redux/thunks/FoodItemThunks";
import { API_STATE, TABLE_CONSTANTS } from "../../utils/constants/common";
import ApiError from "../common/ApiErrors";
import { CommonTable } from "../common/CommonTable";
import secureDomain from "../hoc/SecureDomain";
import "./FoodItemList.scss";
import FoodItemListHeader from "./FoodItemListHeader";
import TableActions from "./TableActions";

interface FoodItemProps extends LocationProps {
  foodItemList: FoodItemInterface[];
  foodItemListError: null | AxiosError;
  foodItemListState: string;
  fetchFoodItemList(start: number, limit: number, conditions: string): void;
  foodItemListTotal: number;
}

const mapStateToProps = (state: { foodItemReducer: FoodItemStoreState }) => {
  const { foodItemList } = state.foodItemReducer;
  return {
    foodItemList: foodItemList.data.foodItemList,
    foodItemListTotal: foodItemList.data.total,
    foodItemListError: foodItemList.error,
    foodItemListState: foodItemList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchFoodItemList: (start: number, limit: number, conditions: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchFoodItemList({ start, limit, conditions }));
    },
  };
};

const FoodItemList: React.FC<FoodItemProps> = ({
  foodItemList,
  foodItemListError,
  foodItemListState,
  fetchFoodItemList,
  foodItemListTotal,
  history,
  match,
}) => {
  const [pageCount, setPageCount] = React.useState(0);
  const { restaurentId } = match.params as any;

  const columns = useMemo(
    () => [
      {
        id: "FoodItemList",
        Header: <FoodItemListHeader restaurentId={restaurentId} />,
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Type",
            accessor: "type",
          },
          {
            Header: "Categories",
            accessor: (row: FoodItemInterface) =>
              row.categories?.map((category) => category.name).join(", "),
          },
          {
            Header: "Actions",
            accessor: "_id",
            Cell: ({ cell }: { cell: CellValue }) => {
              return cell.render(
                <TableActions
                  foodItemId={cell.value}
                  restaurentId={restaurentId}
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
  const data = foodItemList && Array.isArray(foodItemList) ? foodItemList : [];

  const changePageCount = (pageSize: number) => {
    const totalPages =
      foodItemListTotal % pageSize == 0
        ? Math.floor(foodItemListTotal / pageSize)
        : Math.floor(foodItemListTotal / pageSize) + 1;
    setPageCount(totalPages);
  };

  useEffect(() => {
    const totalPages =
      foodItemListTotal % TABLE_CONSTANTS.PAGE_SIZE == 0
        ? Math.floor(foodItemListTotal / TABLE_CONSTANTS.PAGE_SIZE)
        : Math.floor(foodItemListTotal / TABLE_CONSTANTS.PAGE_SIZE) + 1;
    setPageCount(totalPages);
  }, [foodItemListTotal]);

  return (
    <div className="food-item-list d-flex">
      <Row className="w-100 justify-content-start pl-1">
        <Col md="9">
          {foodItemListState === API_STATE.ERROR && (
            <ApiError errors={[foodItemListError?.response?.data.message]} />
          )}
          <CommonTable
            columns={columns}
            data={data}
            fetchCondition={JSON.stringify({
              restaurent: { eq: restaurentId },
            })}
            fetchData={fetchFoodItemList}
            loading={foodItemListState === API_STATE.LOADING}
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
)(secureDomain<FoodItemProps>(FoodItemList));
