import { CaretDownOutlined, CaretLeftFilled, CaretRightFilled, CaretUpOutlined } from '@ant-design/icons';
import type { CellClassParams, ColDef, ColGroupDef, GetRowIdParams, GridReadyEvent } from 'ag-grid-community';
import {
    AllCommunityModule, ClientSideRowModelApiModule,
    ClientSideRowModelModule,
    HighlightChangesModule, ModuleRegistry, NumberEditorModule,
    NumberFilterModule,
    RowApiModule,
    TextEditorModule,
    TextFilterModule, type GridApi
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-balham.css';
import { AgGridReact, type CustomHeaderProps } from 'ag-grid-react';
import { throttle } from 'lodash';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { type StockData } from '../../../interface/stock';
import { usePriceboardSocketStore } from '../../../provider/priceboard-socket-store';
import { getNewItemsOnly, getOldItemsOnly } from '../../../utils';
import channels from '../../../utils/channels';
import FormatNumber from '../../../utils/formater/FormatNumber';
import { priceFormatter, volumeFormatter } from '../table-priceboard-aggrid/utils/board';
import { CustomCellRender, CustomNeutralCellRender } from './customCellRender';
import './index.scss';

ModuleRegistry.registerModules([
    ClientSideRowModelApiModule,
    RowApiModule,
    TextEditorModule,
    TextFilterModule,
    HighlightChangesModule,
    ClientSideRowModelModule,
    NumberFilterModule,
    NumberEditorModule,
    AllCommunityModule,
]);

const CustomHeaderComponent = (props: CustomHeaderProps) => {
    const sort = props.column.getSort();

    const onSortRequested = (order: 'asc' | 'desc' | null, event: any) => {
        props.setSort(order, event.shiftKey);
    };

    const onToggle = () => {
        const columnGroupStates = props.api.getColumnGroupState();
        const columnGroupState = columnGroupStates.find(
            (item) =>
                item.groupId ===
                props.column.getParent()?.getGroupId()
        );

        if (columnGroupState) {
            props.api.setColumnGroupOpened(
                props.column.getParent()?.getProvidedColumnGroup()!,
                !columnGroupState.open
            );
            props.api.refreshHeader();
            props.api.resetColumnState();
        }
    }

    const handleSort = (event: any) => {
        if (sort === 'asc') {
            onSortRequested('desc', event)
        } else if (sort === 'desc') {
            onSortRequested(null, event)
        } else {
            onSortRequested('asc', event)
        }
    }

    return (
        <div className='flex justify-between w-100'>
            <CaretLeftFilled size={4} className='flex' onClick={onToggle} />
            <div className='flex'
                onClick={(event) => handleSort(event)}
                onTouchEnd={(event) => handleSort(event)}
            >
                <div className='flex flex-direction-column justify-center gap-0'>
                    <div className='flex'>{props.displayName}</div>
                    <div className='flex'>
                        {sort === 'desc' ? <CaretDownOutlined size={3} /> :
                            sort === 'asc' ? <CaretUpOutlined size={3} /> : null
                        }
                    </div>
                </div>
            </div>
            <CaretRightFilled size={4} className='flex' onClick={onToggle} />
        </div>
    );

}

const BASE_CLASS = "xl:pr-1 py-1 !group-hover:bg-[#33343C3D] !dark:group-hover:bg-[#33343C] relative text-caption !first:border-t-0 border-r !first:border-l !border-light-line !dark:border-dark-line text-right ";
const HEADER_MAX_WIDTH = 500;
const HEADER_MIN_WIDTH = 40;

// Default column definitions
const DEFAULT_COL_DEF: ColDef = {
    flex: 1,
    minWidth: HEADER_MIN_WIDTH,
    maxWidth: HEADER_MAX_WIDTH,
    cellClass: BASE_CLASS,
    headerClass: "text-center text-caption border-t border-r border-b border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]",
    menuTabs: [],
    sortable: true,
    lockPinned: false,
};

// Default column group definitions
const DEFAULT_COL_GROUP_DEF: ColGroupDef = {
    children: [],
    marryChildren: true,
};

interface IStockCellClassParams<T> extends CellClassParams {
    readonly data: T;
    readonly value: number | string | undefined;
}

// Quy tắc màu văn bản
const priceClassRule = {
    'text-light-price-ceil dark:text-dark-price-ceil': (params: IStockCellClassParams<StockData>) =>
        params.data?.t270 === params.data?.t1149,
    'text-light-price-floor dark:text-dark-price-floor': (params: IStockCellClassParams<StockData>) =>
        params.data?.t270 === params.data?.t1148,
    'text-light-price-ref dark:text-dark-price-ref': (params: IStockCellClassParams<StockData>) =>
        params.data?.t270 === params.data?.t20013,
    'text-light-price-up dark:text-dark-price-up': (params: IStockCellClassParams<StockData>) =>
        Number(params.data?.t270) > Number(params.data?.t20013),
    'text-light-price-down dark:text-dark-price-down': (params: IStockCellClassParams<StockData>) =>
        Number(params.data?.t270) < Number(params.data?.t20013),
};

const bidClassRule: any = (index: number) => ({
    'text-light-price-ceil dark:text-dark-price-ceil': (params: IStockCellClassParams<StockData>) => !!params.data.TPBID && !!params.data.TPBID[index] && params.data.TPBID[index].t270 === params.data.t1149,
    'text-light-price-floor dark:text-dark-price-floor': (params: IStockCellClassParams<StockData>) => !!params.data.TPBID && !!params.data.TPBID[index] && params.data.TPBID[index].t270 === params.data.t1148,
    'text-light-price-ref dark:text-dark-price-ref': (params: IStockCellClassParams<StockData>) => !!params.data.TPBID && !!params.data.TPBID[index] && params.data.TPBID[index].t270 === params.data.t20013,
    'text-light-price-up dark:text-dark-price-up': (params: IStockCellClassParams<StockData>) => !!params.data.TPBID && !!params.data.TPBID[index] && params.data.TPBID[index].t270 > params.data.t20013,
    'text-light-price-down dark:text-dark-price-down': (params: IStockCellClassParams<StockData>) => !!params.data.TPBID && !!params.data.TPBID[index] && params.data.TPBID[index].t270 < params.data.t20013,
})
const askClassRule: any = (index: number) => ({
    'text-light-price-ceil dark:text-dark-price-ceil': (params: IStockCellClassParams<StockData>) => !!params.data.TPOFFER && !!params.data.TPOFFER[index] && params.data.TPOFFER[index].t270 === params.data.t1149,
    'text-light-price-floor dark:text-dark-price-floor': (params: IStockCellClassParams<StockData>) => !!params.data.TPOFFER && !!params.data.TPOFFER[index] && params.data.TPOFFER[index].t270 === params.data.t1148,
    'text-light-price-ref dark:text-dark-price-ref': (params: IStockCellClassParams<StockData>) => !!params.data.TPOFFER && !!params.data.TPOFFER[index] && params.data.TPOFFER[index].t270 === params.data.t20013,
    'text-light-price-up dark:text-dark-price-up': (params: IStockCellClassParams<StockData>) => !!params.data.TPOFFER && !!params.data.TPOFFER[index] && params.data.TPOFFER[index].t270 > params.data.t20013,
    'text-light-price-down dark:text-dark-price-down': (params: IStockCellClassParams<StockData>) => !!params.data.TPOFFER && !!params.data.TPOFFER[index] && params.data.TPOFFER[index].t270 < params.data.t20013,
})

// Column definitions
const columnDefs: (ColDef | ColGroupDef)[] = [
    // Symbol column
    {
        field: 't55',
        headerName: 'Mã CK',
        pinned: 'left',
        minWidth: 100,
        maxWidth: 120,
        marryChildren: true,
        cellClass: 'scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737] !justify-start',
        cellClassRules: priceClassRule,
        headerClass: 'sticky left-0 z-10 text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    // Ceiling, Floor, Reference Price group
    {
        field: 't1149',
        headerName: 'Trần',
        minWidth: 60,
        // maxWidth: 60,
        marryChildren: true,
        valueFormatter: priceFormatter,
        cellClass: BASE_CLASS + 'text-light-price-ceil dark:text-dark-price-ceil',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    {
        field: 't1148',
        headerName: 'Sàn',
        minWidth: 60,
        // maxWidth: 60,
        marryChildren: true,
        valueFormatter: priceFormatter,
        cellClass: BASE_CLASS + 'text-light-price-floor dark:text-dark-price-floor',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    {
        field: 't20013',
        headerName: 'TC',
        minWidth: 60,
        // maxWidth: 60,
        marryChildren: true,
        valueFormatter: priceFormatter,
        cellClass: BASE_CLASS + 'text-light-price-ref dark:text-dark-price-ref',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    // Trading volume
    {
        field: 't387',
        headerName: 'Tổng KL',
        minWidth: 100,
        // maxWidth: 80,
        marryChildren: true,
        valueFormatter: volumeFormatter,
        cellClass: BASE_CLASS,
        cellRenderer: CustomNeutralCellRender,
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    // Bid side group
    {
        headerName: 'Bên mua',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
        marryChildren: true,
        children: [
            {
                field: 'TPBID.0.t270',
                headerName: 'Giá 3',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: bidClassRule(0),
                cellRenderer: CustomCellRender,
                headerClass: 'relative !justify-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.0.t271',
                headerName: 'KL 3',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: bidClassRule(0),
                cellRenderer: CustomCellRender,
                headerClass: 'relative !justify-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.1.t270',
                headerName: 'Giá 2',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: bidClassRule(1),
                cellRenderer: CustomCellRender,
                headerClass: 'relative !justify-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.1.t271',
                headerName: 'KL 2',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: bidClassRule(1),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.2.t270',
                headerName: 'Giá 1',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: bidClassRule(2),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.2.t271',
                headerName: 'KL 1',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: bidClassRule(2),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            // Add more bid levels as needed
        ]
    },
    // Matched group
    {
        headerName: 'Khớp lệnh',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
        marryChildren: true,
        children: [
            {
                field: 't270',
                headerName: 'Giá',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: priceClassRule,
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't271',
                headerName: 'KL',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: priceClassRule,
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'ch_value',
                colId: 'ch_value',
                headerName: '+/-',
                minWidth: 60,
                // maxWidth: 60,
                valueGetter: (params) => FormatNumber({
                    value: (params.data.t270 - params.data.t20013),
                    fractionSize: 2,
                    empty: 0,
                }),
                cellClass: BASE_CLASS,
                cellClassRules: priceClassRule,
                cellRenderer: CustomCellRender,
                // groupId: 'changed',
                columnGroupShow: "open",
                headerComponent: CustomHeaderComponent,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'ch_percent',
                colId: 'ch_percent',
                headerName: '+/-',
                minWidth: 60,
                // maxWidth: 60,
                valueGetter: (params) => FormatNumber({
                    value: ((params.data.t270 - params.data.t20013) / params.data.t20013) * 100,
                    fractionSize: 2,
                    empty: 0,
                }),
                cellClass: BASE_CLASS,
                cellClassRules: priceClassRule,
                cellRenderer: CustomCellRender,
                // groupId: 'changed',
                columnGroupShow: "closed",
                headerComponent: CustomHeaderComponent,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
        ]
    },
    // Ask side group
    {
        headerName: 'Bên bán',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
        marryChildren: true,
        children: [
            {
                field: 'TPOFFER.0.t270',
                headerName: 'Giá 1',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: askClassRule(0),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.0.t271',
                headerName: 'KL 1',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: askClassRule(0),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.1.t270',
                headerName: 'Giá 2',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: askClassRule(1),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.1.t271',
                headerName: 'KL 2',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: askClassRule(1),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.2.t270',
                headerName: 'Giá 3',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: askClassRule(2),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.2.t271',
                headerName: 'KL 3',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: askClassRule(2),
                cellRenderer: CustomCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            // Add more ask levels as needed
        ]
    },
    // Price statistics group
    {
        headerName: 'Giá',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
        marryChildren: true,
        children: [
            {
                field: 't30562',
                headerName: 'Cao',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: {
                    'text-light-price-ceil dark:text-dark-price-ceil': (params) => params.data.t30562 === params.data.t1149,
                    'text-light-price-floor dark:text-dark-price-floor': (params) => params.data.t30562 === params.data.t1148,
                    'text-light-price-ref dark:text-dark-price-ref': (params) => params.data.t30562 === params.data.t20013,
                    'text-light-price-up dark:text-dark-price-up': (params) => params.data.t30562 > params.data.t20013,
                    'text-light-price-down dark:text-dark-price-down': (params) => params.data.t30562 < params.data.t20013,
                },
                cellRenderer: CustomNeutralCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't40001',
                headerName: 'TB',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: {
                    'text-light-price-ceil dark:text-dark-price-ceil': (params) => params.data.t40001 === params.data.t1149,
                    'text-light-price-floor dark:text-dark-price-floor': (params) => params.data.t40001 === params.data.t1148,
                    'text-light-price-ref dark:text-dark-price-ref': (params) => params.data.t40001 === params.data.t20013,
                    'text-light-price-up dark:text-dark-price-up': (params) => params.data.t40001 > params.data.t20013,
                    'text-light-price-down dark:text-dark-price-down': (params) => params.data.t40001 < params.data.t20013,
                },
                cellRenderer: CustomNeutralCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't30563',
                headerName: 'Thấp',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: priceFormatter,
                cellClass: BASE_CLASS,
                cellClassRules: {
                    'text-light-price-ceil dark:text-dark-price-ceil': (params) => params.data.t30563 === params.data.t1149,
                    'text-light-price-floor dark:text-dark-price-floor': (params) => params.data.t30563 === params.data.t1148,
                    'text-light-price-ref dark:text-dark-price-ref': (params) => params.data.t30563 === params.data.t20013,
                    'text-light-price-up dark:text-dark-price-up': (params) => params.data.t30563 > params.data.t20013,
                    'text-light-price-down dark:text-dark-price-down': (params) => params.data.t30563 < params.data.t20013,
                },
                cellRenderer: CustomNeutralCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            }
        ]
    },
    // Foreign room group
    {
        headerName: 'Nước ngoài',
        headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
        marryChildren: true,
        children: [
            {
                field: 't30577',
                headerName: 'Mua',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellRenderer: CustomNeutralCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't30578',
                headerName: 'Bán',
                minWidth: 60,
                // maxWidth: 60,
                valueFormatter: volumeFormatter,
                cellClass: BASE_CLASS,
                cellRenderer: CustomNeutralCellRender,
                headerClass: 'relative text-center text-caption border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            }
        ]
    }
];

// Component implementation
const PriceboardGrid = ({ indexCd = '' }: { indexCd: string }) => {
    const { socket, subscribeFunctWithControl } = usePriceboardSocketStore();

    const dataStockRef = useRef<{ [key: string]: StockData }>({});
    const [tableData, setTableData] = useState<StockData[]>([]);
    const subStockList = useRef<string[]>([]);
    const [stockList, setStockList] = useState<string[]>([]);
    const [tableHeight, setTableHeight] = useState(500);
    const gridApi = useRef<GridApi<any> | null>(null);
    const gridRef = useRef<AgGridReact<StockData>>(null);
    const timeoutRef = useRef<any[]>([]);

    const throttled = useRef(
        throttle(
            () => {
                setTableData([...Object.values(dataStockRef.current)])
            },
            100,
            { trailing: true }
        )
    )

    useEffect(() => {
        const handleResize = () => {
            gridApi.current?.sizeColumnsToFit();
            const { height, top } = document.getElementById("priceboard-layout")!.getBoundingClientRect();

            if (!!height && !!top) {
                setTableHeight(height - top - 8);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            timeoutRef.current.forEach(clearTimeout);
        }
    }, [])

    useEffect(() => {
        dataStockRef.current = {};
        throttled.current();
        return () => {
        }
    }, [indexCd])

    useEffect(() => {
        if (!socket) return;

        socket?.on(channels.onFOSStream, (data) => {
            // Không xử lý data nếu không có topic
            if (!data || !data.topic) return
            if (data.topic.includes("KRXMDDS|IGS|" + indexCd)) {
                const stockNeedSub = getNewItemsOnly(subStockList.current, data.data.STOCK)
                const stockNeedUNSub = getOldItemsOnly(subStockList.current, data.data.STOCK)
                // console.log("getDifferenceString: ", subStockList.current, data.data.STOCK, "\n stockNeedSub: ", stockNeedSub, "\n stockNeedUNSub: ", stockNeedUNSub,);
                subStockList.current = data.data.STOCK
                setStockList([...subStockList.current]);
                dataStockRef.current = data.data.STOCK.reduce((acc: any, cur: string) => {
                    acc[cur] = {
                        t55: cur,
                    }
                    return acc;
                }, {})

                throttled.current();
                if (!!stockNeedSub.length) {
                    subscribeFunctWithControl!({
                        command: "SUB",
                        component: "PRICEBOARD",
                        topic: ["KRXMDDS|ST|G1", "KRXMDDS|SI|G1", "KRXMDDS|MT|G1", "KRXMDDS|TP|G1", "KRXMDDS|MD|G1"],
                        value: stockNeedSub,
                    })
                }
                if (!!stockNeedUNSub.length) {
                    subscribeFunctWithControl!({
                        command: "UNSUB",
                        component: "PRICEBOARD",
                        topic: ["KRXMDDS|ST|G1", "KRXMDDS|SI|G1", "KRXMDDS|MT|G1", "KRXMDDS|TP|G1", "KRXMDDS|MD|G1"],
                        value: stockNeedUNSub,
                    })
                }
            }
            if (data.topic.includes("KRXMDDS|SI|G1|") ||
                data.topic.includes("KRXMDDS|ST|G1|") ||
                data.topic.includes("KRXMDDS|TP|G1|") ||
                data.topic.includes("KRXMDDS|MT|G1|") ||
                data.topic.includes("KRXMDDS|MD|G1|")) {
                const stockKey = data.topic.split("|").slice(-1)[0];

                dataStockRef.current[stockKey] = {
                    ...dataStockRef.current[stockKey],
                    ...data.data
                };

                const rowNode = gridRef.current?.api.getRowNode(stockKey);
                rowNode?.updateData(dataStockRef.current[stockKey]);
                // if (data.topic.includes("KRXMDDS|TP|G1|")) {
                //     let cloneData = dataStockRef.current[stockKey];
                //     setInterval(() => {
                //         cloneData['t270'] = Math.floor(Math.random() * 10000)
                //         cloneData['t271'] = Math.floor(Math.random() * 100000000)
                //         cloneData['t30562'] = Math.floor(Math.random() * 10000)
                //         cloneData['t30563'] = Math.floor(Math.random() * 10000)
                //         cloneData['t40001'] = Math.floor(Math.random() * 10000)
                //         // node?.updateData(cloneData);
                //         updateStockData(stockKey, cloneData);
                //     }, Math.floor(Math.random() * 10000));
                // }

                // throttled.current();
            }
        })

        return () => {
            socket?.off()
        }
    }, [socket])


    const onGridReady = (params: GridReadyEvent) => {
        gridApi.current = params.api;
        setTimeout(() => {
            params.api.sizeColumnsToFit();
        }, 200);
    };

    const getRowId = useCallback((params: GetRowIdParams<StockData>) => {
        return params.data.t55;
    }, []);

    // Hàm cập nhật dữ liệu
    const updateStockData = useCallback((stockKey: string, newData: StockData) => {
        const rowNode = gridRef.current?.api.getRowNode(stockKey);
        if (rowNode && gridRef.current?.api) {
            dataStockRef.current[stockKey] = { ...dataStockRef.current[stockKey], ...newData };
            // Cập nhật theo row
            rowNode.updateData(dataStockRef.current[stockKey]);
        }
    }, []);

    return (
        <div className="ag-theme-balham-dark" style={{ height: tableHeight, width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={DEFAULT_COL_DEF}
                defaultColGroupDef={DEFAULT_COL_GROUP_DEF}
                onGridReady={onGridReady}
                rowHeight={28}
                headerHeight={26}
                rowBuffer={30}
                suppressDragLeaveHidesColumns={true}
                rowDragManaged={true}
                enableCellExpressions={true}
                getRowId={getRowId}
            />
        </div>
    );
};

export default memo(PriceboardGrid);
