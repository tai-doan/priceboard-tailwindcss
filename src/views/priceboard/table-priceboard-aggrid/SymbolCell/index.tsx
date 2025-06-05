import { RowNode, type ICellRendererParams } from 'ag-grid-community';
import classNames from 'classnames';
import * as React from 'react';
import type { BoardKey, INewSymbolData } from '..';
import { SpeedOrderClickType } from '../constants/enum';

interface ISymbolCellProps extends ICellRendererParams {
  readonly boardKey: BoardKey;
  readonly data: INewSymbolData;

  readonly onRemoveRow?: (node: RowNode) => void;
  readonly onShowSymbolInfo?: (
    data: INewSymbolData,
    clickType: SpeedOrderClickType
  ) => void;
  readonly onPinRow?: (node: RowNode) => void;
  readonly onUnpinRow?: (node: RowNode) => void;
}

const SymbolCell: React.FC<ISymbolCellProps> = (props) => {
  const onRemoveRow = React.useCallback(() => {
    if (props.boardKey === 'WATCHLIST') {
      props.onRemoveRow?.(props.node);
    }
  }, [props]);

  const onContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      event.preventDefault();
      if (props.boardKey !== 'WATCHLIST') {
        if (props.node.rowPinned === 'top') {
          if (props.onUnpinRow) {
            props.onUnpinRow(props.node);
          }
        } else {
          if (props.onPinRow) {
            props.onPinRow(props.node);
          }
        }
      }
    },
    [props]
  );

  const onShowSymbolInfo = React.useCallback(
    (clickType: SpeedOrderClickType) => {
      if (props.node?.data) {
        props.onShowSymbolInfo?.(
          props.node.data as INewSymbolData,
          clickType
        );
      }
    },
    [props]
  );

  const onClickShowSymbolInfo = React.useCallback(() => {
    onShowSymbolInfo(SpeedOrderClickType.SINGLE_CLICK);
  }, [onShowSymbolInfo]);

  const onDoubleClickShowSymbolInfo = React.useCallback(() => {
    onShowSymbolInfo(SpeedOrderClickType.DOUBLE_CLICK);
  }, [onShowSymbolInfo]);

  return (
    <div
      className={classNames('SymbolCell', 'ag-cell-wrapper', {
        ['SymbolCellWatchlist']: props.boardKey === 'WATCHLIST',
      })}
      onClick={
        props.boardKey !== 'WATCHLIST'
          ? onClickShowSymbolInfo
          : undefined
      }
      onDoubleClick={
        props.boardKey !== 'WATCHLIST'
          ? onDoubleClickShowSymbolInfo
          : undefined
      }
      onContextMenu={onContextMenu}
    >
      <span
        className={`ag-cell-value`}
        onClick={
          props.boardKey !== 'WATCHLIST'
            ? undefined
            : onClickShowSymbolInfo
        }
        onDoubleClick={
          props.boardKey !== 'WATCHLIST'
            ? undefined
            : onDoubleClickShowSymbolInfo
        }
      >
        {props.value}
        {props.data.ie && <span className={'DiviendDate'}>*</span>}
      </span>
      {props.boardKey === 'WATCHLIST' && (
        <>
          <span className="ag-icon ag-icon-menu" />
          <span
            className="ag-icon ag-icon-cross"
            onClick={onRemoveRow}
          />
        </>
      )}
    </div>
  );
};

export default SymbolCell;



// WEBPACK FOOTER //
// ./src/components/common/StockBoard/SymbolCell/index.tsx