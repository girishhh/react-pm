import { isEmpty } from "lodash";
import React, { ReactNode, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import "./InfiniteScroller.scss";


interface Props {
  fetchData(start: number, limit: number, conditions: string): Promise<any[]>;
  totalItems: number;
  renderCell(item: any): ReactNode;
  noOfItemsInRow: number;
  fetchCondition: string;
}

const InfiniteScroller: React.FC<Props> = ({
  totalItems,
  fetchData,
  renderCell,
  noOfItemsInRow,
  fetchCondition
}) => {
  const [items, setItems] = useState<any[]>([]);
  const cellWidth = 100/noOfItemsInRow;

  
  const canLoadMore = (items: any[], totalItems: number): boolean => {
    if (totalItems === undefined) return true;
    return items.length * noOfItemsInRow < totalItems;
  };

  const loadMore = async (page: any) => {
    const pageNumber = page - 1;
    const listData: any[] = await fetchData(pageNumber * 12, 12, fetchCondition);
    
    if (!isEmpty(listData)) {
      const existingList = items;
      let i = 0;
      while (i < listData.length) {
        let j = 0;
        const cells = [];
        while (j < noOfItemsInRow) {
          if (listData[i + j]?._id) {
            cells.push(
              <div id="cell-width" style={{width: `${cellWidth}%`}} key={listData[i + j]._id}>
                {renderCell(listData[i + j])}
              </div>
            );
          }
          j = j+1;
        }
        const row = (
          <div className="row-item">
            {cells.map((cell) => cell)}
          </div>
        );
        //@ts-ignore
        existingList.push(row);
        i = i + noOfItemsInRow;
      }
      setItems(existingList);
    }
  };

  return (
    <div className="infinite-scroller">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        threshold={1}
        hasMore={canLoadMore(items, totalItems)}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {items.map((item: any) => item)}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScroller;
