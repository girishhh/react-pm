import lodash from "lodash";
import React, { CSSProperties } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
  GridCellRenderer,
  Index,
  IndexRange,
  InfiniteLoader,
  WindowScroller,
} from "react-virtualized";
import { RenderedSection } from "react-virtualized/dist/es/Grid";
import { RestaurentInterface } from "../../interfaces/RestaurentInterface";
import secureDomain from "../hoc/SecureDomain";
import "./GridInfiniteLoader.scss";

interface Props {
  listData: any[];
  isLoading: boolean;
  fetchList(start: number, limit: number, conditions: string): void;
  fetchConditon: "";
  columnCount: number;
  cellData: (
    list: any,
    row: number,
    col: number,
    colCount: number,
    style: CSSProperties,
    totalRecords: number
  ) => JSX.Element;
  totalRecords: number;
}

class GridInfiniteLoader extends React.Component<
  Props,
  { listData: RestaurentInterface[] }
> {
  cache: CellMeasurerCache;
  onRowsRendered: (params: IndexRange) => void;
  grid: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      listData: [],
    };
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 30,
    });
    this.onRowsRendered = () => {};
  }

  isRowLoaded = (params: Index) => {
    const { index } = params;
    return !!this.state.listData[index * this.props.columnCount];
  };

  loadMoreRows = async (params: IndexRange) => {
    const { startIndex, stopIndex } = params;
    const endIndex = stopIndex + this.props.columnCount * 2;
    this.props.fetchList(
      startIndex * this.props.columnCount,
      endIndex - startIndex,
      ""
    );
  };

  cellRenderer: GridCellRenderer = ({
    key,
    rowIndex,
    style,
    parent,
    columnIndex,
  }) => {
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        {this.props.cellData(
          this.state.listData,
          rowIndex,
          columnIndex,
          this.props.columnCount,
          style,
          this.props.totalRecords
        )}
      </CellMeasurer>
    );
  };

  onSectionRendered: (params: RenderedSection) => any = ({
    rowStartIndex,
    rowStopIndex,
  }) => {
    this.onRowsRendered({
      startIndex: rowStartIndex,
      stopIndex: rowStopIndex,
    });
  };

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.listData &&
      !lodash.isEqual(prevProps.listData, this.props.listData)
    ) {
      const { listData } = this.props;
      const existingList = this.state.listData;
      for (let i = 0; i < listData.length; i++) {
        existingList.push(listData[i]);
      }
      this.setState({
        listData: existingList,
      });
    }
  }

  render() {
    const rowCount = this.state.listData.length
      ? this.state.listData.length / this.props.columnCount + 1
      : 1;
    return (
      <div className="container-fluid grid-infinite-loader">
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={rowCount}
          threshold={1}
        >
          {({ onRowsRendered, registerChild }) => {
            this.onRowsRendered = onRowsRendered;
            return (
              <WindowScroller>
                {({ height, scrollTop }) => (
                  <AutoSizer disableHeight onResize={() => {}}>
                    {({ width }) => (
                      <>
                        <Grid
                          autoHeight
                          width={width}
                          height={height}
                          scrollTop={scrollTop}
                          ref={(grid) => {
                            this.grid = grid;
                            registerChild(grid);
                          }}
                          columnWidth={width / this.props.columnCount}
                          columnCount={this.props.columnCount}
                          rowCount={rowCount}
                          rowHeight={this.cache.rowHeight}
                          cellRenderer={this.cellRenderer}
                          onSectionRendered={this.onSectionRendered}
                        />
                        {this.props.isLoading && (
                          <div className="spinner">
                            <Spinner animation="border" />
                          </div>
                        )}
                      </>
                    )}
                  </AutoSizer>
                )}
              </WindowScroller>
            );
          }}
        </InfiniteLoader>
      </div>
    );
  }
}

export default secureDomain<Props>(GridInfiniteLoader);
