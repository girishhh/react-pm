import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as H from "history";
import React, { Dispatch } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  CartItemAction,
  CartItemInterface,
} from "../../interfaces/CartItemInterface";
import {
  createCartItem,
  deleteCartItem,
  refreshCart,
  updateCartItem,
} from "../../redux/thunks/CartItemThunks";
import secureDomain from "../hoc/SecureDomain";
import "./AddToCart.scss";

interface Props {
  cartItem: CartItemInterface;
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<CartItemAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    createCartItem: (cartItem: CartItemInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(createCartItem(cartItem, history));
    },
    updateCartItem: (cartItem: CartItemInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(updateCartItem(cartItem, history));
    },
    deleteCartItem: (cartItem: CartItemInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(deleteCartItem(cartItem._id, history));
    },
    refreshCart: (cartItem: CartItemInterface, history: H.History) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(refreshCart(cartItem, history));
    },
  };
};

const AddToCart: React.FC<Props> = ({ cartItem }) => {
  return (
    <div className="add-to-cart">
      {!cartItem && (
        <Button className="add-btn" variant="secondary">
          Add
        </Button>
      )}
      {cartItem && (
        <Row className="update-cart">
          <Col className="p-0">
            <Button variant="default" className="d-flex">
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Col>
          <Col className="p-0">
            <span className="px-2 pt-2">{cartItem.quantity}</span>
          </Col>
          <Col className="p-0">
            <Button variant="default" className="d-flex">
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
)(secureDomain<Props>(AddToCart));
