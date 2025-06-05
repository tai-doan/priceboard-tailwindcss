import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import {
  type ColDef,
  type IHeaderParams,
  Column,
  ColumnApi,
  GridApi,
} from 'ag-grid-community';
import type { IHeaderReactComp } from 'ag-grid-react';
import * as React from 'react';

interface IToggleHeaderProps {
  readonly displayName: string;
  readonly column: Column;
  readonly columnApi: ColumnApi;
  readonly api: GridApi;
}

class ToggleHeader extends React.Component<
  IToggleHeaderProps,
  IHeaderReactComp
> {
  private localSortState?: string | null;

  constructor(props: IToggleHeaderProps) {
    super(props);

    this.state = { refresh: (params: IHeaderParams) => true };
  }

  render() {
    const sortable = (this.props.column.getDefinition() as ColDef).sortable;
    const sortModels = this.props.columnApi.getColumnState();

    const currentColumn = sortModels.find(
      (val) => val.colId === this.props.column.getUniqueId()
    );
    if (sortModels.length > 0 && currentColumn) {
      this.localSortState = currentColumn.sort;
    }

    return (
      <div
        className={`ToggleHeader ${sortable === true ? 'Clickable' : ''
          }`}
        {...(sortable === true && { onClick: this.onSort })}
      >
        <CaretLeftFilled onClick={this.onToggle} />
        {this.props.displayName}
        {this.localSortState != null && (
          <div
            className={`ag-icon ${this.localSortState === 'asc' ? 'ag-icon-asc' : 'ag-icon-desc'
              }`}
          />
        )}
        <CaretRightFilled onClick={this.onToggle} />
      </div>
    );
  }

  private onToggle = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    const columnGroupStates = this.props.columnApi.getColumnGroupState();

    const columnGroupState = columnGroupStates.find(
      (item) =>
        item.groupId ===
        this.props.column.getParent().getOriginalColumnGroup().getGroupId()
    );
    if (columnGroupState) {
      this.props.columnApi.setColumnGroupOpened(
        this.props.column.getParent().getOriginalColumnGroup(),
        !columnGroupState.open
      );
      this.props.api.refreshHeader();
      this.props.columnApi.resetColumnState();
    }
  };

  private onSort = () => {
    this.props.column.setColDef(
      {
        ...this.props.column.getColDef(),
        sort:
          this.localSortState === 'asc'
            ? 'desc'
            : this.localSortState === 'desc'
              ? null
              : 'asc',
      },
      null
    );
    this.props.columnApi.resetColumnState();

    this.props.api.refreshHeader();
  };
}

export default React.memo(ToggleHeader);
