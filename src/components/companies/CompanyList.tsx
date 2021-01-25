import { AxiosError } from "axios";
import React, { Dispatch, useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { CellValue } from "react-table";
import { ThunkDispatch } from "redux-thunk";
import { LocationProps } from "../../interfaces/CommonInterface";
import {
  CompanyAction,
  CompanyInterface,
  CompanyStoreState,
} from "../../interfaces/CompanyInterface";
import { fetchCompanyList } from "../../redux/thunks/CompanyThunks";
import { API_STATE, TABLE_CONSTANTS } from "../../utils/constants/common";
import ApiError from "../common/ApiErrors";
import { CommonTable } from "../common/CommonTable";
import secureDomain from "../hoc/SecureDomain";
import CompanyListHeader from "./CompanyListHeader";
import TableActions from "./TableActions";
import "./CompanyList.scss";

interface CompanyProps extends LocationProps {
  companyList: CompanyInterface[];
  companyListError: null | AxiosError;
  companyListState: string;
  fetchCompanyList(start: number, limit: number): void;
  companyListTotal: number;
}

const mapStateToProps = (state: { companyReducer: CompanyStoreState }) => {
  const { companyList } = state.companyReducer;
  return {
    companyList: companyList.data.companyList,
    companyListTotal: companyList.data.total,
    companyListError: companyList.error,
    companyListState: companyList.state,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<CompanyAction> | ThunkDispatch<{}, {}, any>
) => {
  return {
    fetchCompanyList: (start: number, limit: number) => {
      const thunkDispatch = dispatch as ThunkDispatch<{}, {}, any>;
      thunkDispatch(fetchCompanyList({ start, limit }));
    },
  };
};

const CompanyList: React.FC<CompanyProps> = ({
  companyList,
  companyListError,
  companyListState,
  fetchCompanyList,
  companyListTotal,
  history,
}) => {
  const [pageCount, setPageCount] = React.useState(0);

  const columns = useMemo(
    () => [
      {
        id: "CompanyList",
        Header: <CompanyListHeader />,
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "City",
            accessor: "city",
          },
          {
            Header: "Subdomain",
            accessor: "subdomain",
          },
          {
            Header: "TimeZone",
            accessor: "timeZone",
          },
          {
            Header: "Actions",
            accessor: "_id",
            Cell: ({ cell }: { cell: CellValue }) => {
              return cell.render(
                <TableActions companyId={cell.value} history={history} />
              );
            },
          },
        ],
      },
    ],
    []
  );
  const data = companyList && Array.isArray(companyList) ? companyList : [];

  const changePageCount = (pageSize: number) => {
    const totalPages =
      companyListTotal % pageSize == 0
        ? Math.floor(companyListTotal / pageSize)
        : Math.floor(companyListTotal / pageSize) + 1;
    setPageCount(totalPages);
  };

  useEffect(() => {
    const totalPages =
      companyListTotal % TABLE_CONSTANTS.PAGE_SIZE == 0
        ? Math.floor(companyListTotal / TABLE_CONSTANTS.PAGE_SIZE)
        : Math.floor(companyListTotal / TABLE_CONSTANTS.PAGE_SIZE) + 1;
    setPageCount(totalPages);
  }, [companyListTotal]);

  return (
    <div className="company-list d-flex">
      <Row className="w-100 justify-content-start pl-1">
        <Col md="9">
          {companyListState === API_STATE.ERROR && (
            <ApiError errors={[companyListError?.response?.data.message]} />
          )}
          <CommonTable
            columns={columns}
            data={data}
            fetchCondition=""
            fetchData={fetchCompanyList}
            loading={companyListState === API_STATE.LOADING}
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
)(secureDomain<CompanyProps>(CompanyList));
