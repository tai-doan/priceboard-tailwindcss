import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import {
  type ColDef,
  type IHeaderParams,
  ColumnApi,
  ColumnGroup,
  GridApi,
} from 'ag-grid-community';
import type { ColumnGroupChild } from 'ag-grid-community/dist/lib/entities/columnGroupChild';
import type { IHeaderReactComp } from 'ag-grid-react';
import * as React from 'react';

interface IToggleGroupHeaderProps {
  readonly displayName: string;
  readonly columnGroup: ColumnGroup;
  readonly columnApi: ColumnApi;
  readonly api: GridApi;
  readonly staticHeader: boolean;
  readonly iconHeader: boolean;
}

class ToggleGroupHeader extends React.Component<
  IToggleGroupHeaderProps,
  IHeaderReactComp
> {
  static defaultProps = {
    staticHeader: true,
    iconHeader: true,
  };

  private localColumn?: ColumnGroupChild;
  private localSortState?: string | null;

  constructor(props: IToggleGroupHeaderProps) {
    super(props);

    this.state = { refresh: (params: IHeaderParams) => true };
  }

  render() {
    const displayedChildren = this.props.columnGroup.getDisplayedChildren();

    if (displayedChildren?.length || 1 > 0) {
      this.localColumn = displayedChildren?.[0];
      const sortable = (this.localColumn?.getDefinition() as ColDef).sortable;
      const groupSortable = (this.props.columnGroup.getDefinition() as ColDef)
        .sortable;

      const sortModels = this.props.columnApi.getColumnState();
      const currentColumn = sortModels.find(
        (val) => val.colId === this.localColumn?.getUniqueId()
      );
      if (sortModels.length > 0 && currentColumn) {
        this.localSortState = currentColumn.sort;
      }

      return (
        <div
          className={`ToggleGroupHeader ${sortable === true && groupSortable === true ? 'Clickable' : ''
            }`}
          {...(sortable === true &&
            groupSortable === true && { onClick: this.onSort })}
        >
          {this.props.iconHeader === true ? (
            <div className='Content'>
              <span>
                <CaretLeftOutlined size={8} onClick={this.onToggle} />
                </span>
              <span>
                {this.props.staticHeader !== true
                  ? this.localColumn?.getDefinition()?.headerName
                  : this.props.displayName}
              </span>
              {this.localSortState != null && (
                <div
                  className={`ag-icon ${this.localSortState === 'asc'
                    ? 'ag-icon-asc'
                    : 'ag-icon-desc'
                    }`}
                />
              )}
              <span>
              <CaretRightOutlined size={8} onClick={this.onToggle} />
              </span>
            </div>
          ) : (
            <div>
              <span>{this.props.displayName}</span>
            </div>
          )}
        </div>
      );
    }

    return null;
  }

  private onToggle = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();

    const columnGroupStates = this.props.columnApi.getColumnGroupState();

    const columnGroupState = columnGroupStates.find(
      (item) =>
        item.groupId === this.props.columnGroup.getOriginalColumnGroup().getId()
    );
    if (columnGroupState) {
      this.props.columnApi.setColumnGroupOpened(
        this.props.columnGroup.getOriginalColumnGroup(),
        !columnGroupState.open
      );
      this.props.api.refreshHeader();
      this.props.columnApi.resetColumnState();
    }
  };

  private onSort = () => {
    this.props.columnApi.setColumnState([
      {
        colId: this.localColumn?.getUniqueId(),
        sort:
          this.localSortState === 'asc'
            ? 'desc'
            : this.localSortState === 'desc'
              ? null
              : 'asc',
      },
    ]);

    this.props.api.refreshHeader();
  };
}

export default React.memo(ToggleGroupHeader);
