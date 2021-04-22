import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import React, { Dispatch, memo } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  CartItemAction,
  CartItemInterface,
  CreateCartItemRequestInterface,
} from "../../interfaces/CartItemInterface";
import {
  FoodItemInterface,
  FoodItemStoreState,
} from "../../interfaces/FoodItemInterface";
import {
  createCartItem,
  deleteCartItem,
  refreshCart,
  updateCartItem,
} from "../../redux/thunks/CartItemThunks";
import { shallowEqualObjects } from "shallow-equal";
import { fetchFoodItemDetails } from "../../redux/thunks/FoodItemThunks";
import { getUserCartDetails } from "../../redux/thunks/UserThunks";
import { API_STATE } from "../../utils/constants/common";
import secureDomain from "../hoc/SecureDomain";
import "./AddToCart.scss";

interface Props {
  foodItem: FoodItemInterface;
  createCartItem(
    cartItem: CreateCartItemRequestInterface
  ): Promise<{ status: number }>;
  updateCartItem(cartItem: CartItemInterface): Promise<{ status: number }>;
  deleteCartItem(cartItem: CartItemInterface): Promise<{ status: number }>;
  refreshCart(cartItem: CartItemInterface): void;
  fetchFoodItemDetails(_id: string): void;
  foodItemDetailsError: null | AxiosError;
  foodItemDetailsLoadingState: string;
  indexedFoodItems: any;
  getUserCartDetails(): void;
  foodItemDetails: FoodItemInterface;
}

const mapStateToProps = (state: { foodItemReducer: FoodItemStoreState }) => {
  const { foodItemDetails, indexedFoodItems } = state.foodItemReducer;
  return {
    foodItemDetails: foodItemDetails.data.foodItemDetails,
    foodItemDetailsError: foodItemDetails.error,
    foodItemDetailsLoadingState: foodItemDetails.state,
    indexedFoodItems,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<CartItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createCartItem: async (cartItem: CreateCartItemRequestInterface) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      const response = await thunkDispatch(createCartItem(cartItem));
      return (response as unknown) as { status: number };
    },
    updateCartItem: async (cartItem: CartItemInterface) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      const response = await thunkDispatch(updateCartItem(cartItem));
      return (response as unknown) as { status: number };
    },
    deleteCartItem: async (cartItem: CartItemInterface) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      const response = await thunkDispatch(deleteCartItem(cartItem._id));
      return (response as unknown) as { status: number };
    },
    refreshCart: (cartItem: CartItemInterface) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(refreshCart(cartItem));
    },
    fetchFoodItemDetails: (_id: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchFoodItemDetails({ _id }, true));
    },
    getUserCartDetails: () => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(getUserCartDetails());
    },
  };
};

const AddToCart: React.FC<Props> = ({
  foodItem,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  refreshCart,
  fetchFoodItemDetails,
  indexedFoodItems,
  getUserCartDetails,
  foodItemDetailsLoadingState,
  foodItemDetails,
}) => {
  const { cartItem } = isEmpty(indexedFoodItems)
    ? foodItem || {}
    : indexedFoodItems[foodItem._id] || foodItem || {};

  const createAndDisplayUpdatedCartItem = async () => {
    const response = await createCartItem({
      price: foodItem.price,
      quantity: 1,
      foodItem: foodItem._id,
      restaurent: foodItem.restaurent._id,
    });
    if (response?.status === 201) {
      fetchFoodItemDetails(foodItem._id);
      getUserCartDetails();
    }
  };

  const updateAndDisplayCartItem = async (
    currentQuantity: number,
    increamentBy: number
  ) => {
    const quantity = currentQuantity + increamentBy;
    const response =
      quantity > 0
        ? await updateCartItem({
            ...cartItem,
            quantity,
            incQuantity: increamentBy > 0,
          })
        : await deleteCartItem(cartItem);
    if (response?.status === 204 || response?.status === 200) {
      fetchFoodItemDetails(foodItem._id);
      getUserCartDetails();
    }
  };

  const isLoading = (): boolean => {
    return (
      foodItem._id === foodItemDetails?._id &&
      foodItemDetailsLoadingState === `${foodItem._id}/${API_STATE.LOADING}`
    );
  };

  return (
    <div className="add-to-cart">
      {isLoading() && <Spinner animation="border" />}
      {!isLoading() && !cartItem && (
        <Button
          className="add-btn"
          variant="secondary"
          onClick={createAndDisplayUpdatedCartItem}
        >
          Add
        </Button>
      )}
      {!isLoading() && cartItem && (
        <Row className="update-cart">
          <Col className="p-0">
            <Button
              variant="default"
              className="d-flex"
              onClick={() => updateAndDisplayCartItem(cartItem.quantity, -1)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Col>
          <Col className="p-0">
            <span className="px-2 pt-2">{cartItem.quantity}</span>
          </Col>
          <Col className="p-0">
            <Button
              variant="default"
              className="d-flex"
              onClick={() => updateAndDisplayCartItem(cartItem.quantity, +1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(memo(AddToCart)));
