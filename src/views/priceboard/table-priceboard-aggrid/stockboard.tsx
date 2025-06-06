import type {
  ColDef,
  ColGroupDef,
  ColumnApi,
  ColumnGroupOpenedEvent,
  ColumnState,
  DragStoppedEvent,
  GridApi,
  GridReadyEvent,
  RowDragEndEvent,
  RowHeightParams,
  RowNode,
  SortChangedEvent
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  DEFAULT_COL_DEF,
  DEFAULT_COL_GROUP_DEF,
  getColumnDefs,
} from './config';
import {
  IndexStock,
  Market
} from './constants/enum';
import type { IBoardSubTab } from './interfaces/common';
import * as utils from './utils';
import { setColumnConfig } from './utils/common';

const BOARD_KEY = 'BoardKey';

export type INewSymbolData = any;
export type IState = any;
export type BoardKey =
  | 'WATCHLIST'
  | 'HOSE'
  | IndexStock
  | 'HNX'
  | 'UPCOM'
  | 'FUTURES'
  | 'CW'
  | 'FUND'
  | 'BOND'
  | 'AI Rating'
  | 'PutThrough'
  | 'Oddlot'
  | 'ETF'
  | 'All'
  | 'ODDLOT'
  | 'BUYIN';

export interface IBoardTab {
  readonly key: BoardKey;
  readonly title?: string;
  readonly market?: Market;
  readonly data?: IBoardSubTab[];
  readonly default?: boolean;
  readonly selectedSubTab?: IBoardSubTab;
}

export interface IColumnConfig {
  readonly key: BoardKey;
  readonly cols?: ColumnState[];
}

export interface IStockBoardProps {
  symbols: string[];
  indexCd: string;
  selectedRow?: INewSymbolData;
  onDragEnd?: (stockCode: string, newIndex: number) => void;
  onChangeSortStatus?: (status: boolean) => void;
}

export const StockBoardComponent: React.FC<IStockBoardProps> = (props) => {
  const {
    symbols,
    indexCd,
    selectedRow,
    onDragEnd,
    onChangeSortStatus,
  } = props;

  // Refs for instance variables
  const localGridApi = React.useRef<GridApi>(null);
  const localColumnApi = React.useRef<ColumnApi>(null);
  const localColumnDefs = React.useRef<Array<ColGroupDef | ColDef>>(getColumnDefs(indexCd));
  const localPinnedRow = React.useRef<RowNode[]>([]);
  const localTabKey = React.useRef<string>(null);

  React.useEffect(() => {
    localColumnDefs.current = getColumnDefs(indexCd);
    localTabKey.current = indexCd;
    localGridApi.current?.setColumnDefs(localColumnDefs.current);
    applyColumnConfig(indexCd);
    localGridApi.current?.onFilterChanged();
    refreshBoardData();
  }, [indexCd]);

  React.useEffect(() => {
    if (indexCd === 'HNX') {
      localColumnDefs.current = getColumnDefs(indexCd);
      localGridApi.current?.setColumnDefs(localColumnDefs.current);
    }
    refreshBoardData();
  }, [indexCd]);

  React.useEffect(() => {
    onScrollToSelectedRow(selectedRow);
  }, [selectedRow]);

  const applyColumnConfig = (key: string) => {
    if (localColumnApi.current) {
      const colConfigs = utils.getKey<IColumnConfig[]>(BOARD_KEY);
      if (colConfigs != null) {
        const config = colConfigs.find((val: any) => val.key === key);
        if (config && config.cols && config.cols.length) {
          localColumnApi.current.setColumnState(config.cols);
        }
      }
    }
  };

  const onScrollToSelectedRow = (selectedRow?: INewSymbolData) => {
    if (selectedRow) {
      const node = localGridApi.current?.getRowNode(selectedRow.s);
      if (node) {
        localGridApi.current?.ensureIndexVisible(node.rowIndex, 'top');
        localGridApi.current?.setFocusedCell(node.rowIndex || 0, 's');
      }
    }
  };

  const refreshBoardData = () => {
    localColumnApi.current?.applyColumnState({});
    localGridApi.current?.setRowData([]);
    localGridApi.current?.setPinnedTopRowData([]);
    localGridApi.current?.refreshHeader();
    localPinnedRow.current = [];
  };

  const onGridReady = (event: GridReadyEvent) => {
    localGridApi.current = event.api;
    localColumnApi.current = event.columnApi;

    event.api.setColumnDefs(localColumnDefs.current);
    console.log("localColumnDefs.current: ", localColumnDefs.current);

    applyColumnConfig(indexCd);

    event.api.sizeColumnsToFit();
    window.addEventListener('resize', resizeGrid);

    event.api.showLoadingOverlay();

    // if (boardData) {
    //   const data = utils.getBoardData(
    //     boardData.data,
    //     selectedTab.key,
    //     localMarketStatus.current,
    //     localSymbolSession.current
    //   );

    //   if (data.length > 0) {
    //     event.api.hideOverlay();
    //     event.api.setRowData([
    //       ...data,
    //       {
    //         s: 'LastRow',
    //         isLastRow: true,
    //         content: utils.getLastRowContent(
    //           selectedTab.key,
    //           selectedTab.selectedSubTab?.key,
    //         )
    //       }
    //     ]);
    //   } else {
    //     event.api.showNoRowsOverlay();
    //   }
    // }
  };

  const onColumnGroupOpened = (event: ColumnGroupOpenedEvent) => {
    resizeGrid();
  };

  const onGridColumnsChanged = () => {
    resizeGrid();
  };

  const resizeGrid = () => {
    setTimeout(() => {
      localGridApi.current?.sizeColumnsToFit();
    }, 500);
  };

  const onColumnVisible = () => {
    localGridApi.current?.refreshHeader();
    resizeGrid();
  };

  const getRowHeight = (params: RowHeightParams) => {
    if (params.data.isLastRow) {
      return 33;
    }
    return 26;
  };

  const onDragStopped = (event: DragStoppedEvent) => {
    const cols = event.columnApi.getColumnState();
    setColumnConfig(indexCd, cols);
  };

  const onRowDragEnd = (event: RowDragEndEvent) => {
    onDragEnd?.(event.node.data.s, event.overIndex);
  };

  const onSort = (event: SortChangedEvent) => {
    event.api.refreshHeader();
    const sortStatus = event.columnApi.getColumnState().length > 0;
    if (indexCd === 'WATCHLIST') {
      onChangeSortStatus?.(sortStatus);
    }
  };

  const postSort = (mutableNodes: RowNode[]) => {
    for (const i in mutableNodes) {
      if (mutableNodes[i].data.isLastRow) {
        mutableNodes.push(mutableNodes.splice(+i, 1)[0]);
      }
    }
  };

  const isExternalFilterPresent = () => {
    return localTabKey.current !== 'WATCHLIST';
  };

  const isFullWidthCell = (node: RowNode) => {
    return node.data.isLastRow;
  };

  const doesExternalFilterPass = (node: RowNode) => {
    return (
      localPinnedRow.current?.findIndex((val) => val.data?.s === node.id) === -1
    );
  };

  const translateLocaleText = (key: string, defaultValue: string) => {
    const value = key;

    return value || defaultValue;
  }

  return (
    // <div className={`StockBoard ag-theme-balham-dark`}>
    // </div>
    <AgGridReact
      rowData={symbols}
      onGridReady={onGridReady}
      onGridColumnsChanged={onGridColumnsChanged}
      // localeTextFunc={translateLocaleText}
      onColumnGroupOpened={onColumnGroupOpened}
      onColumnVisible={onColumnVisible}
      defaultColDef={DEFAULT_COL_DEF}
      defaultColGroupDef={DEFAULT_COL_GROUP_DEF}
      headerHeight={25.5}
      rowHeight={26}
      enableCellExpressions={true}
      getRowHeight={getRowHeight}
      // getRowNodeId={utils.getRowNodeId}
      asyncTransactionWaitMillis={500}
      // cellFlashDelay={500}
      // cellFadeDelay={100}
      suppressDragLeaveHidesColumns={true}
      onDragStopped={onDragStopped}
      rowBuffer={10}
      // enableCellChangeFlash={true}
      rowDragManaged={true}
      onRowDragEnd={onRowDragEnd}
      // postSort={postSort}
      onSortChanged={onSort}
      isExternalFilterPresent={isExternalFilterPresent}
      // doesExternalFilterPass={doesExternalFilterPass}
      // isFullWidthCell={isFullWidthCell}
    />
  );
};

export default React.memo(StockBoardComponent);
