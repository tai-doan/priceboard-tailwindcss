import type { ColDef, ColGroupDef, GridReadyEvent } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import { throttle } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import type { StockData } from '../../../interface/stock';
import { usePriceboardSocketStore } from '../../../provider/priceboard-socket-store';
import { getNewItemsOnly, getOldItemsOnly } from '../../../utils';
import channels from '../../../utils/channels';
import './index.scss';

ModuleRegistry.registerModules([
    AllCommunityModule,
]);

// Default column definitions
const DEFAULT_COL_DEF: ColDef = {
    flex: 1,
    minWidth: 60,
    headerClass: "text-center text-caption border-t border-r border-b border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]",
    maxWidth: 500,
    cellClass: "Cell",
    menuTabs: [],
    sortable: true,
    lockPinned: false,
};

// Default column group definitions
const DEFAULT_COL_GROUP_DEF: ColGroupDef = {
    children: [],
    marryChildren: true,
};

// Column definitions
const columnDefs: (ColDef | ColGroupDef)[] = [
    // Symbol column
    {
        field: 't55',
        headerName: 'Mã CK',
        pinned: 'left',
        minWidth: 100,
        // maxWidth: 60,
        marryChildren: true,
        cellClass: 'symbol-cell',
        headerClass: 'sticky left-0 z-10 text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    // Ceiling, Floor, Reference Price group
    {
        field: 't1149',
        headerName: 'Trần',
        minWidth: 60,
        // maxWidth: 60,
        marryChildren: true,
        cellClass: 'ceil-cell',
        headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    {
        field: 't1148',
        headerName: 'Sàn',
        minWidth: 60,
        // maxWidth: 60,
        marryChildren: true,
        cellClass: 'floor-cell',
        headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    {
        field: 't20013',
        headerName: 'TC',
        minWidth: 60,
        // maxWidth: 60,
        marryChildren: true,
        cellClass: 'ref-cell',
        headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
    },
    // Trading volume
    {
        field: 't387',
        headerName: 'Tổng KL',
        minWidth: 80,
        // maxWidth: 80,
        marryChildren: true,
        cellClass: 'volume-cell',
        headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
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
                maxWidth: 60,
                cellClass: 'bid-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.0.t271',
                headerName: 'KL 3',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'bid-volume-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.1.t270',
                headerName: 'Giá 2',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'bid-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.1.t271',
                headerName: 'KL 2',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'bid-volume-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.2.t270',
                headerName: 'Giá 1',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'bid-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPBID.2.t271',
                headerName: 'KL 1',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'bid-volume-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
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
                maxWidth: 60,
                cellClass: 'match-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't271',
                headerName: 'KL',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'match-volume-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'ch',
                headerName: '+/-',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'change-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            }
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
                maxWidth: 60,
                cellClass: 'ask-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.0.t271',
                headerName: 'KL 1',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'ask-volume-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.1.t270',
                headerName: 'Giá 2',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'ask-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.1.t271',
                headerName: 'KL 2',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'ask-volume-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.2.t270',
                headerName: 'Giá 3',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'ask-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 'TPOFFER.2.t271',
                headerName: 'KL 3',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'ask-volume-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
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
                maxWidth: 60,
                cellClass: 'high-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't40001',
                headerName: 'TB',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'avg-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't30563',
                headerName: 'Thấp',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'low-price-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
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
                maxWidth: 60,
                cellClass: 'fr-buy-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
            },
            {
                field: 't30578',
                headerName: 'Bán',
                minWidth: 60,
                maxWidth: 60,
                cellClass: 'fr-sell-cell',
                headerClass: 'relative text-center text-caption border-t border-b border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]',
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
                throttled.current();
            }
        })

        return () => {
            socket?.off()
        }
    }, [socket])

    const onGridReady = (params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();

        // Gọi lại sizeColumnsToFit khi cửa sổ thay đổi kích thước
        window.addEventListener('resize', () => {
            setTimeout(() => {
                params.api.sizeColumnsToFit();
            });
        });
    };

    return (
        <div className="ag-theme-balham-dark" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={DEFAULT_COL_DEF}
                defaultColGroupDef={DEFAULT_COL_GROUP_DEF}
                onGridReady={onGridReady}
                rowHeight={28}
                headerHeight={26}
                // enableCellChangeFlash={true}
                // cellFlashDelay={500}
                // cellFadeDelay={100}
                rowBuffer={20}
                suppressDragLeaveHidesColumns={true}
                rowDragManaged={true}
                enableCellExpressions={true}
            />
        </div>
    );
};

export default memo(PriceboardGrid);
