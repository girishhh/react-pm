import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import React, { Dispatch, useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { CartInterface } from "../../interfaces/CartInterface";
import { FoodItemInterface } from "../../interfaces/FoodItemInterface";
import { UserAction, UserStoreState } from "../../interfaces/UserInterface";
import { getUserCartDetails } from "../../redux/thunks/UserThunks";
import { API_STATE } from "../../utils/constants/common";
import AddToCart from "../cart-items/AddToCart";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";

interface Props {
  getUserCartDetails(): void;
  userCartDetailsError: null | AxiosError;
  userCartDetailsState: string;
  userCartDetails: CartInterface;
}

const mapStateToProps = (state: { userReducer: UserStoreState }) => {
  const { userCartDetails } = state.userReducer;
  return {
    userCartDetails: userCartDetails.data.cartDetails,
    userCartDetailsError: userCartDetails.error,
    userCartDetailsState: userCartDetails.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<UserAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    getUserCartDetails: () => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(getUserCartDetails());
    },
  };
};

const CartDetails: React.FC<Props> = ({
  getUserCartDetails,
  userCartDetails,
  userCartDetailsError,
  userCartDetailsState,
}) => {
  useEffect(() => {
    getUserCartDetails();
  }, []);

  const isLoading = (): boolean => {
    return userCartDetailsState === API_STATE.LOADING;
  };

  const isError = (): boolean => {
    return userCartDetailsState === API_STATE.ERROR;
  };

  return (
    <Row className="cart-details justify-content-center pt-2">
      {isLoading() && (
        <div className="w-100 d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}
      {isError() && (
        <ApiError errors={[userCartDetailsError?.response?.data.message]} />
      )}
      {isEmpty(userCartDetails?.cartItems) && <>No Cart Data</>}
      {userCartDetails?.cartItems && (
        <Row className="mx-0 w-100">
          <Col className="d-flex">
            <h3>Cart: {userCartDetails.cartItems.length}</h3>
          </Col>
        </Row>
      )}
      {userCartDetails?.cartItems?.map((cartItem) => {
        const foodItem = cartItem.foodItem as FoodItemInterface;
        return (
          <div className="d-block w-100 text-start">
            <Row className="mx-0 pt-3">
              <Col>{foodItem.name}</Col>
              <Col>
                <AddToCart cartItem={cartItem} />
              </Col>
              <Col>{cartItem.price * cartItem.quantity}</Col>
            </Row>
          </div>
        );
      })}
      {userCartDetails && (
        <Row className="pt-4 mx-0 w-100">
          <Col>
            <h4>
              SubTotal: <span className="pl-2">{userCartDetails.subTotal}</span>
            </h4>
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(CartDetails));
