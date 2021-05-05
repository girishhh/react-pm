import { AxiosError } from "axios";
import * as H from "history";
import React, { Dispatch } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  OrderAction,
  OrderInterface,
  OrderStoreState,
} from "../../interfaces/OrderInterface";
import { createOrder } from "../../redux/thunks/OrderThunks";
import { API_STATE } from "../../utils/constants/common";
import ApiError from "../common/ApiErrors";
import secureDomain from "../hoc/SecureDomain";

interface Props {
  history: H.History;
  orderCreate: OrderInterface;
  orderCreateError: null | AxiosError;
  orderCreateLoadingState: string;
  createOrder(history: H.History, cartId: string): void;
}

const mapStateToProps = (state: { orderReducer: OrderStoreState }) => {
  const { orderCreate } = state.orderReducer;
  return {
    orderCreate: orderCreate.data.cartDetails,
    orderCreateError: orderCreate.error,
    orderCreateLoadingState: orderCreate.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<OrderAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createOrder: (history: H.History, cartId: string) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createOrder({ cartId, payment: "dccsd" }, history));
    },
  };
};

const MakePayment: React.FC<Props> = ({
  history,
  orderCreate,
  orderCreateError,
  orderCreateLoadingState,
  createOrder,
}) => {
  const { cartId } = history.location.state as any;

  const isError = (): boolean => {
    return orderCreateLoadingState === API_STATE.ERROR;
  };

  const isLoading = (): boolean => {
    return orderCreateLoadingState === API_STATE.LOADING;
  };

  return (
    <Row>
      <Col>
        {isError() && (
          <>
            <ApiError errors={[orderCreateError?.response?.data.message]} />
          </>
        )}
        {isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        <Button onClick={() => createOrder(history, cartId)}>
          Pay and Order
        </Button>
      </Col>
    </Row>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(MakePayment));
