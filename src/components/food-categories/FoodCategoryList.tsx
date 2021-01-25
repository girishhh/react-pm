import { AxiosError } from "axios";
import React, { Dispatch, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CellValue } from "react-table";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  FoodCategoryInterface,
  FoodCategoryStoreState,
  FoodCategoryAction,
} from "../../interfaces/FoodCategoryInterface";
import { fetchFoodCategoryList } from "../../redux/thunks/FoodThunks";
import { API_STATE, TABLE_CONSTANTS } from "../../utils/constants/common";
import ApiError from "../common/ApiErrors";
import { CommonTable } from "../common/CommonTable";
import secureDomain from "../hoc/SecureDomain";
import "./FoodCategoryList.scss";
import FoodCategoryListHeader from "./FoodCategoryListHeader";
import TableActions from "./TableActions";

interface FoodCategoryProps extends LocationProps {
  foodCategoryList: FoodCategoryInterface[];
  foodCategoryListError: null | AxiosError;
  foodCategoryListState: string;
  fetchFoodCategoryList(start: number, limit: number, conditions: string): void;
  foodCategoryListTotal: number;
}

const mapStateToProps = (state: {
  foodCategoryReducer: FoodCategoryStoreState;
}) => {
  const { foodCategoryList } = state.foodCategoryReducer;

  return {
    foodCategoryList: foodCategoryList.data.foodCategoryList,
    foodCategoryListTotal: foodCategoryList.data.total,
    foodCategoryListError: foodCategoryList.error,
    foodCategoryListState: foodCategoryList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodCategoryAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchFoodCategoryList: (
      start: number,
      limit: number,
      conditions: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchFoodCategoryList({ start, limit, conditions }));
    },
  };
};

const FoodCategoryList: React.FC<FoodCategoryProps> = ({
  foodCategoryList,
  foodCategoryListError,
  foodCategoryListState,
  fetchFoodCategoryList,
  foodCategoryListTotal,
  history,
}) => {
  const [pageCount, setPageCount] = React.useState(0);

  const columns = useMemo(
    () => [
      {
        id: "FoodCategoryList",
        Header: <FoodCategoryListHeader />,
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
                <TableActions foodCategoryId={cell.value} history={history} />
              );
            },
          },
        ],
      },
    ],
    []
  );
  const data =
    foodCategoryList && Array.isArray(foodCategoryList) ? foodCategoryList : [];

  const changePageCount = (pageSize: number) => {
    const totalPages =
      foodCategoryListTotal % pageSize == 0
        ? Math.floor(foodCategoryListTotal / pageSize)
        : Math.floor(foodCategoryListTotal / pageSize) + 1;
    setPageCount(totalPages);
  };

  useEffect(() => {
    const totalPages =
      foodCategoryListTotal % TABLE_CONSTANTS.PAGE_SIZE == 0
        ? Math.floor(foodCategoryListTotal / TABLE_CONSTANTS.PAGE_SIZE)
        : Math.floor(foodCategoryListTotal / TABLE_CONSTANTS.PAGE_SIZE) + 1;
    setPageCount(totalPages);
  }, [foodCategoryListTotal]);

  return (
    <div className="food-category-list d-flex">
      <Row className="w-100 justify-content-start pl-1">
        <Col md="9">
          {foodCategoryListState === API_STATE.ERROR && (
            <ApiError
              errors={[foodCategoryListError?.response?.data.message]}
            />
          )}
          <CommonTable
            columns={columns}
            data={data}
            fetchCondition={""}
            fetchData={fetchFoodCategoryList}
            loading={foodCategoryListState === API_STATE.LOADING}
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
)(secureDomain<FoodCategoryProps>(FoodCategoryList));
