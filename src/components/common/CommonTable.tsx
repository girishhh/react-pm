import React, { ReactElement, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import BTable from "react-bootstrap/Table";
import { usePagination, useTable } from "react-table";
import "./CommonTable.scss";

interface Props<D> {
  columns: any[];
  data: D[];
  fetchData(start: number, limit: number, conditions: string): void;
  fetchCondition: string;
  loading: boolean;
  pageCount: number;
  changePageCount(pageSize: number): void;
}

export const CommonTable = <D extends object>(
  props: Props<D>
): ReactElement => {
  const {
    columns,
    data,
    fetchData,
    fetchCondition = "",
    loading,
    pageCount: controlledPageCount,
    changePageCount,
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<D>(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination
  );

  useEffect(() => {
    if (fetchCondition) {
      fetchData(pageIndex * pageSize, pageSize, fetchCondition);
    } else {
      fetchData(pageIndex * pageSize, pageSize, "");
    }
  }, [pageIndex, pageSize]);

  return (
    <>
      {loading && (
        <div className="w-100 d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && (
        <BTable
          striped
          bordered
          hover
          size="sm"
          className="common-table"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td align="center" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </BTable>
      )}

      <div className="pagination">
        <Button
          variant="dark"
          size="sm"
          className="mr-1"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>{" "}
        <Button
          variant="dark"
          size="sm"
          className="mr-1"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>{" "}
        <Button
          variant="dark"
          size="sm"
          className="mr-1"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>{" "}
        <Button
          variant="dark"
          size="sm"
          className="mr-1"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>{" "}
        <span className="d-flex align-items-center">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            className="mr-1"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            changePageCount(Number(e.target.value));
          }}
        >
          {[10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
