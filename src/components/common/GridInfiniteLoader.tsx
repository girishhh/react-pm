import { isEmpty } from "lodash";
import React, { CSSProperties } from "react";
import { Spinner } from "react-bootstrap";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  ColumnSizer,
  Grid,
  GridCellRenderer,
  Index,
  IndexRange,
  InfiniteLoader,
  Size,
  WindowScroller,
} from "react-virtualized";
import { RenderedSection } from "react-virtualized/dist/es/Grid";
import { RestaurentInterface } from "../../interfaces/RestaurentInterface";
import secureDomain from "../hoc/SecureDomain";
import "./GridInfiniteLoader.scss";

interface Props {
  listData: any[];
  isLoading: boolean;
  fetchList(start: number, limit: number, conditions: string): Promise<any[]>;
  fetchConditon: string;
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
  onResize?(width: number): void;
}

class GridInfiniteLoader extends React.Component<
  Props,
  { listData: RestaurentInterface[] }
> {
  cache: CellMeasurerCache;
  onRowsRendered: (params: IndexRange) => void;

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
    const listData = await this.props.fetchList(
      startIndex * this.props.columnCount,
      endIndex - startIndex,
      this.props.fetchConditon
    );

    if (!isEmpty(listData)) {
      const existingList = this.state.listData;
      for (let i = 0; i < listData.length; i++) {
        existingList.push(listData[i]);
      }
      this.setState({
        listData: existingList,
      });
    }
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

  render() {
    const rowCount = this.state.listData.length
      ? Math.ceil(this.state.listData.length / this.props.columnCount) + 1
      : 1;
    const { onResize } = this.props;
    return (
      <div className="container-fluid grid-infinite-loader">
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={rowCount}
          threshold={1}
        >
          {({ onRowsRendered }) => {
            this.onRowsRendered = onRowsRendered;
            return (
              <WindowScroller>
                {({ height, scrollTop }) => (
                  <AutoSizer
                    disableHeight
                    onResize={(info: Size) => {
                      onResize?.(info.width);
                      this.cache.clearAll();
                    }}
                  >
                    {({ width }) => (
                      <>
                        <ColumnSizer
                          columnMaxWidth={500}
                          columnMinWidth={50}
                          columnCount={this.props.columnCount}
                          width={width}
                        >
                          {({ registerChild }) => (
                            <Grid
                              autoHeight
                              width={width}
                              height={height}
                              scrollTop={scrollTop}
                              ref={(grid) => {
                                registerChild(grid);
                              }}
                              columnWidth={width / this.props.columnCount}
                              columnCount={this.props.columnCount}
                              rowCount={rowCount}
                              rowHeight={this.cache.rowHeight}
                              cellRenderer={this.cellRenderer}
                              onSectionRendered={this.onSectionRendered}
                            />
                          )}
                        </ColumnSizer>

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
