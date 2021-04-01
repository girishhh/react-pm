import { AxiosError } from "axios";
import React, { CSSProperties, Dispatch, useState } from "react";
import { Card, Col, Nav, NavItem, NavLink, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  FoodItemAction,
  FoodItemInterface,
  FoodItemStoreState,
} from "../../interfaces/FoodItemInterface";
import { RestaurentInterface } from "../../interfaces/RestaurentInterface";
import { fetchFoodItemList } from "../../redux/thunks/FoodItemThunks";
import { API_STATE } from "../../utils/constants/common";
import { getCategories } from "../../utils/helpers/RestaurentHelper";
import GridInfiniteLoader from "../common/GridInfiniteLoader";
import secureDomain from "../hoc/SecureDomain";
import "./CustomerRestaurentView.scss";

interface CustomerRestaurentViewProps {
  restaurentDetails: RestaurentInterface;
  foodItemList: FoodItemInterface[];
  foodItemListError: null | AxiosError;
  foodItemListState: string;
  fetchFoodItemList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<FoodItemInterface[]>;
  foodItemListTotal: number;
}

const mapStateToProps = (state: { foodItemReducer: FoodItemStoreState }) => {
  const { foodItemList } = state.foodItemReducer;
  return {
    foodItemList: foodItemList.data.foodItemList,
    foodItemListTotal: foodItemList.data.filteredDocumentCount,
    foodItemListError: foodItemList.error,
    foodItemListState: foodItemList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<FoodItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchFoodItemList: async (
      start: number,
      limit: number,
      conditions: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      const foodItemList = await thunkDispatch(
        fetchFoodItemList({ start, limit, conditions })
      );
      return (foodItemList as unknown) as FoodItemInterface[];
    },
  };
};

const CustomerRestaurentView: React.FC<CustomerRestaurentViewProps> = ({
  restaurentDetails,
  foodItemList,
  foodItemListTotal,
  foodItemListError,
  foodItemListState,
  fetchFoodItemList,
}) => {
  const categories = getCategories(restaurentDetails);
  const [category, setCategory] = useState<string | undefined>();

  const cellData = (
    list: FoodItemInterface[],
    row: number,
    col: number,
    colCount: number,
    style: CSSProperties,
    totalRecords: number
  ) => {
    const cellIndex = row * colCount + col;
    if (list && cellIndex > totalRecords - 1) return <></>;
    const foodItem = list && list[row * colCount + col];

    return (
      <div id="restaurent-cell" style={{ ...style, padding: "40px" }}>
        <Card style={{ minHeight: "100px" }}>
          <Card.Body>
            <Card.Title>{foodItem && foodItem.name}</Card.Title>
            <Card.Text>
              <span>{foodItem && foodItem.name}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <Row className="customer-restaurent-view h-100">
      <Col md="3" className="category-filters">
        <Nav>
          {categories.map((cat, index) => (
            <NavItem className="w-100 text-right" as="li" key={index}>
              <NavLink
                onClick={() => {
                  setCategory(cat._id);
                }}
              >
                {cat.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Col>
      <Col md="6" className="food-items">
        <GridInfiniteLoader
          key={category}
          listData={foodItemList}
          isLoading={foodItemListState === API_STATE.LOADING}
          columnCount={1}
          cellData={cellData}
          fetchList={fetchFoodItemList}
          fetchConditon={
            category
              ? JSON.stringify({
                  restaurent: { eq: restaurentDetails._id },
                  categories: { eq: category },
                })
              : JSON.stringify({
                  restaurent: { eq: restaurentDetails._id },
                })
          }
          totalRecords={foodItemListTotal}
        />
      </Col>
    </Row>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<CustomerRestaurentViewProps>(CustomerRestaurentView));
