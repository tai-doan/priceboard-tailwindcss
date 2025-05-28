import { DeleteOutlined, PushpinOutlined } from '@ant-design/icons';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type Cell, type ColumnDef, type Row, type RowPinningState, type SortingState } from '@tanstack/react-table';
import { useVirtualizer, Virtualizer, type VirtualItem } from '@tanstack/react-virtual';
import { throttle } from 'lodash';
import React, { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import usePriceboardSocket from '../../../hooks/usePriceboardSocket';
import type { StockData } from '../../../interface/stock';
import { getNewItemsOnly, getOldItemsOnly } from '../../../utils';
import channels from '../../../utils/channels';
import FormatNumber from '../../../utils/formater/FormatNumber';
import HeaderTablePriceboard from '../table-priceboard/header-table-priceboard';

const baseClass = "xl:pr-1 py-1 group-hover:bg-[#33343C3D] dark:group-hover:bg-[#33343C] relative text-caption first:border-t-0 border-r first:border-l border-light-line dark:border-dark-line text-right "

const getWidthColumn = (key: string) => {
    const ele = document.getElementById('thead_' + key)
    if (ele && ele.getBoundingClientRect) {
        if (ele.getBoundingClientRect) return ele.getBoundingClientRect().width
        else return ele.offsetWidth
    } else return 76
}

const getClassNames = (colID: string, rowIndex: number): string => {
    let className = '';
    if (colID === 'stock_code') {
        className += "scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737] ";
    }
    // Trường hợp các cell đặt biệt
    if (colID === 'ceil' ||
        colID === 'floor' ||
        colID === 'ref' ||
        colID === 'highest' ||
        colID === 'lowest' ||
        colID === 'avg' ||
        colID === 'volume' ||
        // colID === 'FR_volume_buy' ||
        // colID === 'FR_volume_sell' ||
        colID === 'match_price' ||
        colID === 'match_volume' ||
        colID === 'match_change'
    ) {
        className += baseClass;
        if (colID === 'ceil') {
            className += " text-light-price-ceil dark:text-dark-price-ceil "
        }
        if (colID === 'floor') {
            className += " text-light-price-floor dark:text-dark-price-floor "
        }
        if (colID === 'ref') {
            className += " text-light-price-ref dark:text-dark-price-ref "
        }
        if (colID === 'volume'
            // || colID === 'FR_volume_buy'
            // || colID === 'FR_volume_sell'
        ) {
            className += " text-light-default dark:text-dark-default "
        }
        if (rowIndex % 2 === 0) {
            className += ' dark:bg-[#78788061] bg-[#eaeaea] ';
        } else {
            className += ' dark:bg-[#7878802E] bg-[#F3F5F6] ';
        }
        return className + " ";
    }

    // Các trường hợp còn lại
    className += baseClass;
    if (rowIndex % 2 === 0) {
        className += ' dark:bg-[#262628] bg-[#F3F5F6] ';
    } else {
        className += ' dark:bg-[#060606] bg-[#FFFFFF] ';
    }
    return className + " ";
}

const TablePriceboardV3 = ({ indexCd = '' }: { indexCd: string }) => {
    const { socket, subscribeFunctWithControl } = usePriceboardSocket();
    const [tableHeight, setTableHeight] = useState(500);
    const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
        top: [],
        bottom: [],
    })
    // Chỉ dùng để force update toàn bộ component
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const throttled = useRef(
        throttle(
            () => {
                setTableData([...Object.values(dataStockRef.current)])
            },
            500,
            { trailing: true }
        )
    )
    const [sorting, setSorting] = useState<SortingState>([]);
    const dataStockRef = useRef<{ [key: string]: StockData }>({});
    const [tableData, setTableData] = useState<StockData[]>([]);
    const subStockList = useRef<string[]>([]);
    const columns = useMemo<Array<ColumnDef<StockData>>>(
        () => [
            // Mã CK
            {
                accessorKey: 't55',
                id: 'stock_code',
                header: 'Mã CK',
                minSize: 40,
                cell: ({ row, }) => (
                    <div className="w-full h-full px-2 overflow-ellipsis flex flex-column justify-between overflow-hidden cursor-pointer" title={row.original.t55}>
                        <button className={getColor(row.original.t20013, row.original.t270) + " text-left"}>{row.original.t55}</button>
                        {row.getIsPinned()
                            ? <DeleteOutlined
                                title='Click để gỡ mã CK ra khỏi đầu danh mục'
                                className='flex'
                                style={{ color: "#F08200" }}
                                onClick={() => row.pin(false)}
                            />
                            : <PushpinOutlined
                                title='Click để pin mã CK lên đầu danh mục'
                                className='flex'
                                style={{ color: "#F08200" }}
                                onClick={() => row.pin('top')}
                            />
                        }
                    </div>
                ),
            },
            // Trần
            {
                accessorKey: 't1149',
                id: 'ceil',
                header: 'Trần',
                minSize: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t1149,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                }),
            },
            // Sàn
            {
                accessorKey: 't1148',
                id: 'floor',
                header: 'Sàn',
                minSize: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t1148,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                }),
            },
            // TC
            {
                accessorKey: 't20013',
                id: 'ref',
                header: 'TC',
                minSize: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t20013,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                }),
            },
            // Tổng KL
            {
                accessorKey: 't387',
                id: 'total_volume',
                header: 'Tổng KL',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t387,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                }),
            },
            // Bên mua - Giá 3
            {
                accessorKey: 'TPBID.0.t270',
                id: 'orderbook_bids_2_price',
                header: 'Giá 3',
                minSize: 60,
                cell: ({ row }) =>
                    FormatNumber({
                        value: row.original.TPBID?.[0]?.t270,
                        fractionSize: 2,
                        empty: 0,
                        key: 'short',
                        translateFunc(key) {
                            return ''
                        },
                    })
            },
            // Bên mua - KL 3
            {
                accessorKey: 'TPBID.0.t271',
                id: 'orderbook_bids_2_volume',
                header: 'KL 3',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[0]?.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên mua - Giá 2
            {
                accessorKey: 'TPBID.1.t270',
                id: 'orderbook_bids_1_price',
                header: 'Giá 2',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[0]?.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên mua - KL 2
            {
                accessorKey: 'TPBID.1.t271',
                id: 'orderbook_bids_1_volume',
                header: 'KL 2',
                minSize: 60,
                cell: ({ row }) =>
                    FormatNumber({
                        value: row.original.TPBID?.[0]?.t271,
                        fractionSize: 2,
                        empty: 0,
                        key: 'short',
                        translateFunc(key) {
                            return ''
                        },
                    })
            },
            // Bên mua - Giá 1
            {
                accessorKey: 'TPBID.2.t270',
                id: 'orderbook_bids_0_price',
                header: 'Giá 1',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[2]?.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên mua - KL 1
            {
                accessorKey: 'TPBID.2.t271',
                id: 'orderbook_bids_0_volume',
                header: 'KL 1',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[2]?.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Khớp lệnh - Giá
            {
                accessorKey: 't270',
                id: 'match_price',
                header: 'Giá',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t270,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Khớp lệnh - KL
            {
                accessorKey: 't271',
                id: 'match_volume',
                header: 'KL',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Khớp lệnh - +/-
            {
                accessorKey: 't31',
                id: 'match_change',
                header: '+/-',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t270 === 0 ? 0 : (row.original.t270 - row.original.t20013),
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên bán - Giá 1
            {
                accessorKey: 'TPOFFER.0.t270',
                id: 'orderbook_asks_0_price',
                header: 'Giá 1',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[0]?.t270,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên bán - KL 1
            {
                accessorKey: 'TPOFFER.0.t271',
                id: 'orderbook_asks_0_volume',
                header: 'KL 1',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[0]?.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên bán - Giá 2
            {
                accessorKey: 'TPOFFER.1.t270',
                id: 'orderbook_asks_1_price',
                header: 'Giá 2',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[1]?.t270,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên bán - KL 2
            {
                accessorKey: 'TPOFFER.1.t271',
                id: 'orderbook_asks_1_volume',
                header: 'KL 2',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[1]?.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên bán - Giá 3
            {
                accessorKey: 'TPOFFER.2.t270',
                id: 'orderbook_asks_2_price',
                header: 'Giá 3',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[2]?.t270,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Bên bán - KL 3
            {
                accessorKey: 'TPOFFER.2.t271',
                id: 'orderbook_asks_2_volume',
                header: 'KL 3',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[2]?.t271,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Cao
            {
                accessorKey: 't30562',
                id: 'highest',
                header: 'Cao',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30562,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // TB
            {
                accessorKey: 't40001',
                id: 'avg',
                header: 'TB',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t40001,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Thấp
            {
                accessorKey: 't30563',
                id: 'lowest',
                header: 'Thấp',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30563,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                })
            },
            // Mua
            {
                accessorKey: 't30577',
                id: 'FR_volume_buy',
                header: 'Mua',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30577,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                }),
            },
            // Bán
            {
                accessorKey: 't30578',
                id: 'FR_volume_sell',
                header: 'Bán',
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30578,
                    fractionSize: 2,
                    empty: 0,
                    key: 'short',
                    translateFunc(key) {
                        return ''
                    },
                }),

            }
        ],
        []
    );

    useEffect(() => {
        const handleResize = () => {
            const { height, top } = document.getElementById("priceboard-layout")!.getBoundingClientRect();

            if (!!height && !!top) {
                setTableHeight(height - top - 8);
            }
        }
        handleResize();
        document.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
        dataStockRef.current = {};
        throttled.current();
        setRowPinning({
            top: [],
            bottom: [],
        });
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
                subStockList.current = data.data.STOCK
                dataStockRef.current = data.data.STOCK.reduce((acc: any, cur: string) => {
                    acc[cur] = {
                        t55: cur,
                    }
                    return acc;
                }, {})

                throttled.current();
                console.log("throttled() => dataStockRef.current= ", JSON.parse(JSON.stringify(dataStockRef.current)));
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

    const table = useReactTable({
        data: tableData,
        columns,
        state: {
            sorting,
            rowPinning,
        },
        initialState: {
            rowPinning: {
                top: [],
                bottom: [],
            },
        },
        onRowPinningChange: setRowPinning,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: false,
    });

    const { rows } = table.getRowModel();

    const tableContainerRef = React.useRef<HTMLDivElement>(null)
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 26, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef.current,
        measureElement:
            typeof window !== 'undefined' &&
                navigator.userAgent.indexOf('Firefox') === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 20,
    })

    const getColor = useCallback((refPrice = 0, matchPrice = 0) => {
        if (refPrice === 0 || matchPrice === 0) return ' text-light-price-ref dark:text-dark-price-ref ';
        if (refPrice < matchPrice) return " text-light-price-up dark:text-dark-price-up "
        if (refPrice > matchPrice) return " text-light-price-down dark:text-dark-price-down "
        if (refPrice === matchPrice) return " text-light-price-ref dark:text-dark-price-ref "
    }, []);

    const getColorClass = useCallback((id: string, row: Row<StockData>) => {
        switch (id) {
            case 'highest':
                return getColor(row.original.t20013, row.original?.t30562);
            case 'lowest':
                return getColor(row.original.t20013, row.original?.t30563);
            case 'avg':
                return getColor(row.original.t20013, row.original?.t40001);
            case 'ceil':
                return getColor(row.original.t20013, row.original?.t1149);
            case 'floor':
                return getColor(row.original.t20013, row.original?.t1148);
            case 'ref':
                return getColor(row.original.t20013, row.original?.t20013);
            case 'match_price':
                return getColor(row.original.t20013, row.original?.t270);
            case 'match_volume':
                return getColor(row.original.t20013, row.original?.t271);
            case 'match_change':
                return getColor(row.original.t20013, row.original.t270 === 0 ? 0 : (row.original.t270 - row.original.t20013));
            case 'orderbook_bids_0_price':
                return getColor(row.original.t20013, row.original?.TPBID?.[2]?.t270);
            case 'orderbook_bids_1_price':
                return getColor(row.original.t20013, row.original?.TPBID?.[1]?.t270);
            case 'orderbook_bids_2_price':
                return getColor(row.original.t20013, row.original?.TPBID?.[0]?.t270);
            case 'orderbook_asks_0_price':
                return getColor(row.original.t20013, row.original?.TPOFFER?.[0]?.t270);
            case 'orderbook_asks_1_price':
                return getColor(row.original.t20013, row.original?.TPOFFER?.[1]?.t270);
            case 'orderbook_asks_2_price':
                return getColor(row.original.t20013, row.original?.TPOFFER?.[2]?.t270);
            default:
                return ''; // Hoặc một giá trị mặc định khác
        }
    }, []);

    // const getClassNames = useCallback((colID: string, rowIndex: number): string => {
    //     let className = '';
    //     if (colID === 'stock_code') {
    //         className += "scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737] ";
    //     }
    //     // Trường hợp các cell đặt biệt
    //     if (colID === 'ceil' ||
    //         colID === 'floor' ||
    //         colID === 'ref' ||
    //         colID === 'highest' ||
    //         colID === 'lowest' ||
    //         colID === 'avg' ||
    //         colID === 'volume' ||
    //         // colID === 'FR_volume_buy' ||
    //         // colID === 'FR_volume_sell' ||
    //         colID === 'match_price' ||
    //         colID === 'match_volume' ||
    //         colID === 'match_change'
    //     ) {
    //         className += baseClass;
    //         if (colID === 'ceil') {
    //             className += " text-light-price-ceil dark:text-dark-price-ceil "
    //         }
    //         if (colID === 'floor') {
    //             className += " text-light-price-floor dark:text-dark-price-floor "
    //         }
    //         if (colID === 'ref') {
    //             className += " text-light-price-ref dark:text-dark-price-ref "
    //         }
    //         if (colID === 'volume'
    //             // || colID === 'FR_volume_buy'
    //             // || colID === 'FR_volume_sell'
    //         ) {
    //             className += " text-light-default dark:text-dark-default "
    //         }
    //         if (rowIndex % 2 === 0) {
    //             className += ' dark:bg-[#78788061] bg-[#eaeaea] ';
    //         } else {
    //             className += ' dark:bg-[#7878802E] bg-[#F3F5F6] ';
    //         }
    //         return className + " ";
    //     }

    //     // Các trường hợp còn lại
    //     className += baseClass;
    //     if (rowIndex % 2 === 0) {
    //         className += ' dark:bg-[#262628] bg-[#F3F5F6] ';
    //     } else {
    //         className += ' dark:bg-[#060606] bg-[#FFFFFF] ';
    //     }
    //     return className + " ";
    // }, []);

    return (
        <div
            className={`relative overflow-auto mac-scrollbar`}
            style={{ height: tableHeight }}
            ref={tableContainerRef}
        >
            <table id="table-priceboard" className="w-full border-separate border-spacing-0" style={{
                tableLayout: "fixed",
                marginBottom: 0,
                marginTop: 0,
            }}>
                <HeaderTablePriceboard />
                <tbody
                    style={{
                        position: 'relative',
                        height: `${rowVirtualizer.getTotalSize()}px`,
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const row = rows[virtualRow.index];
                        return (
                            <PriceboardTableRow
                                key={row.id}
                                rowVirtualizer={rowVirtualizer}
                                virtualRow={virtualRow}
                                row={row}
                                getColorClass={getColorClass}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

const PriceboardTableRow = memo(({ rowVirtualizer, virtualRow, row, getColorClass }: { rowVirtualizer: Virtualizer<HTMLDivElement, Element>, row: Row<StockData>, virtualRow: VirtualItem, getColorClass: Function }) => {
    return (
        <tr
            data-index={virtualRow.index} //needed for dynamic row height measurement
            ref={(node) => rowVirtualizer?.measureElement(node)} //measure dynamic row height
            key={row.id + "_" + row.original.t55 + "_" + virtualRow.index}
            style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'absolute',
                transform: `translateY(${virtualRow.start}px)`, // this should always be a `style` as it changes on scroll
                width: '100%',
            }}
            className="group"
        >
            {row.getVisibleCells().map((cell) => (
                <PriceboardTableCell key={cell.id} cell={cell} getColorClass={getColorClass} />
            ))}
        </tr>
    );
});

const PriceboardTableCell = memo(({ cell, getColorClass }: { cell: Cell<StockData, any>, getColorClass: Function }) => {
    const row = cell.row;
    const colId = cell.column.id;
    const rowIndex = row.index;

    return (
        <td
            key={row.id + "_" + row.original.t55 + "_" + cell.id}
            className={getClassNames(colId, rowIndex)}
            style={{
                display: 'flex',
                width: getWidthColumn(colId),
            }}
        >
            <div className={'!w-full !h-full ' + getColorClass(colId, row)}>
                {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                )}
            </div>
        </td>
    );
});

export default memo(TablePriceboardV3);