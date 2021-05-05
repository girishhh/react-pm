import { AxiosError } from "axios";
import * as H from "history";
import React, { CSSProperties, Dispatch, useState } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  AddressAction,
  AddressInterface,
  AddressStoreState,
} from "../../interfaces/AddressInterface";
import { LocationProps } from "../../interfaces/CommonInterface";
import { fetchAddressList } from "../../redux/thunks/AddressThunks";
import { API_STATE } from "../../utils/constants/common";
import { getUser } from "../../utils/helpers/AuthHelper";
import CartDetails from "../carts/CartDetails";
import ApiError from "../common/ApiErrors";
import GridInfiniteLoader from "../common/GridInfiniteLoader";
import secureDomain from "../hoc/SecureDomain";

interface Props extends LocationProps {
  history: H.History;
  addressList: AddressInterface[];
  addressListError: null | AxiosError;
  addressListState: string;
  fetchAddressList(
    start: number,
    limit: number,
    conditions: string
  ): Promise<AddressInterface[]>;
  addressListTotal: number;
}

const mapStateToProps = (state: { addressReducer: AddressStoreState }) => {
  const { addressList } = state.addressReducer;
  return {
    addressList: addressList.data.addressList,
    addressListTotal: addressList.data.filteredAddressCount,
    addressListError: addressList.error,
    addressListState: addressList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<AddressAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchAddressList: async (
      start: number,
      limit: number,
      conditions: string
    ) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      const addressList = await thunkDispatch(
        fetchAddressList({ start, limit, conditions })
      );
      return (addressList as unknown) as AddressInterface[];
    },
  };
};

const CheckoutDetails: React.FC<Props> = ({
  history,
  fetchAddressList,
  addressList,
  addressListTotal,
  addressListError,
  addressListState,
}) => {
  const user = getUser();
  const conditions = {
    modelName: { eq: "User" },
    modelId: { eq: `${user?._id}` },
  };
  const [columnCount, setColumnCount] = useState(1);

  const cellData = (
    list: AddressInterface[],
    row: number,
    col: number,
    colCount: number,
    style: CSSProperties,
    totalRecords: number
  ) => {
    const cellIndex = row * colCount + col;
    if (list && cellIndex > totalRecords - 1) return <></>;
    const addressData = list && list[row * colCount + col];
    return (
      <div style={{ ...style }} className="p-3">
        <Card style={{ minHeight: "180px" }}>
          <Card.Body>
            <Card.Text>
              <span>{addressData && addressData.house}</span>
              <span>{addressData && addressData.city}</span>
              <span>{addressData && addressData.district}</span>
              <span>{addressData && addressData.country}</span>
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
      setColumnCount(1);
    }
  };

  const isError = (): boolean => {
    return addressListState === API_STATE.ERROR;
  };

  const isLoading = (): boolean => {
    return addressListState === API_STATE.LOADING;
  };

  return (
    <Row className="checkout-details d-flex w-100 mx-0">
      <Col className="px-0">
        {isError() && (
          <>
            <ApiError errors={[addressListError?.response?.data.message]} />
          </>
        )}
        {isLoading() && (
          <div className="w-100 d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        )}
        {!isLoading() && (
          <Row className="w-100 mx-0">
            <Col md="8">
              <GridInfiniteLoader
                listData={addressList}
                isLoading={addressListState === API_STATE.LOADING}
                columnCount={columnCount}
                cellData={cellData}
                fetchList={fetchAddressList}
                totalRecords={addressListTotal}
                fetchConditon={JSON.stringify(conditions)}
                onResize={onResize}
              />
            </Col>
            <Col md="4">
              <CartDetails history={history} source="checkout" />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(secureDomain<Props>(CheckoutDetails));
