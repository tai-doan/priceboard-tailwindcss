import { DeleteOutlined, PushpinOutlined } from '@ant-design/icons';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type Row, type RowPinningState, type SortingState } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { throttle } from 'lodash';
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import usePriceboardSocket from '../../../hooks/usePriceboardSocket';
import type { StockData } from '../../../interface/stock';
import { getNewItemsOnly, getOldItemsOnly } from '../../../utils';
import channels from '../../../utils/channels';
import FormatNumber from '../../../utils/formater/FormatNumber';
import HeaderTablePriceboard from '../table-priceboard/header-table-priceboard';

const baseClass = "xl:pr-1 py-1 group-hover:bg-[#33343C3D] dark:group-hover:bg-[#33343C] relative text-caption first:border-t-0 border-r first:border-l border-light-line dark:border-dark-line text-right "

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
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const throttled = useRef(
        throttle(
            () => {
                forceUpdate()
            },
            100,
            { trailing: true }
        )
    )
    const [sorting, setSorting] = useState<SortingState>([]);
    const dataStockRef = useRef<{ [key: string]: StockData }>({});
    const [tableData, setTableData] = useState<StockData[]>([]);
    const subStockList = useRef<string[]>([]);

    useEffect(() => {
        const handleResize = () => {
            const { height, top } = document.getElementById("priceboard-layout")!.getBoundingClientRect();

            if (!!height && !!top) {
                setTableHeight(height - top - 8);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    useEffect(() => {
        dataStockRef.current = {};
        // setTableData([]);
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
                // console.log("getDifferenceString: ", subStockList.current, data.data.STOCK, "\n stockNeedSub: ", stockNeedSub, "\n stockNeedUNSub: ", stockNeedUNSub,);
                subStockList.current = data.data.STOCK
                dataStockRef.current = data.data.STOCK.reduce((acc: any, cur: string) => {
                    acc[cur] = {
                        t55: cur,
                    }
                    return acc;
                }, {})

                // setTableData([...Object.values(dataStockRef.current)])
                throttled.current();
                console.log("setTableData : ", JSON.parse(JSON.stringify(dataStockRef.current)));

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

    const columns = useMemo<Array<ColumnDef<StockData>>>(
        () => [
            // Mã CK
            {
                accessorKey: 't55',
                id: 'stock_code',
                header: 'Mã CK',
                // size: 40,
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
                // size: 40,
                minSize: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t1149,
                    fractionSize: 2,
                    empty: 0,
                }),
            },
            // Sàn
            {
                accessorKey: 't1148',
                id: 'floor',
                header: 'Sàn',
                // size: 40,
                minSize: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t1148,
                    fractionSize: 2,
                    empty: 0,
                }),
            },
            // TC
            {
                accessorKey: 't20013',
                id: 'ref',
                header: 'TC',
                // size: 40,
                minSize: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t20013,
                    fractionSize: 2,
                    empty: 0,
                }),
            },
            // Tổng KL
            {
                accessorKey: 't387',
                id: 'total_volume',
                header: 'Tổng KL',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t387,
                    fractionSize: 2,
                    empty: 0,
                }),
            },
            // Bên mua - Giá 3
            {
                accessorKey: 'TPBID.0.t270',
                id: 'TPBID.0.t270',
                header: 'Giá 3',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPBID?.[0]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPBID?.[0]?.t270,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên mua - KL 3
            {
                accessorKey: 'TPBID.0.t271',
                id: 'TPBID.0.t271',
                header: 'KL 3',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPBID?.[0]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPBID?.[0]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên mua - Giá 2
            {
                accessorKey: 'TPBID.1.t270',
                id: 'TPBID.1.t270',
                header: 'Giá 2',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPBID?.[1]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPBID?.[0]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên mua - KL 2
            {
                accessorKey: 'TPBID.1.t271',
                id: 'TPBID.1.t271',
                header: 'KL 2',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPBID?.[1]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPBID?.[0]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên mua - Giá 1
            {
                accessorKey: 'TPBID.2.t270',
                id: 'TPBID.2.t270',
                header: 'Giá 1',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPBID?.[2]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPBID?.[2]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên mua - KL 1
            {
                accessorKey: 'TPBID.2.t271',
                id: 'TPBID.2.t271',
                header: 'KL 1',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPBID?.[2]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPBID?.[2]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Khớp lệnh - Giá
            {
                accessorKey: 't270',
                id: 'match_price',
                header: 'Giá',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.t270)}>
                    {FormatNumber({
                        value: row.original.t270,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Khớp lệnh - KL
            {
                accessorKey: 't271',
                id: 'match_volume',
                header: 'KL',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.t271)}>
                    {FormatNumber({
                        value: row.original.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Khớp lệnh - +/-
            {
                accessorKey: 't31',
                id: 'match_change',
                header: '+/-',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.t270)}>
                    {FormatNumber({
                        value: row.original.t270 - row.original.t20013,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên bán - Giá 1
            {
                accessorKey: 'TPOFFER.0.t270',
                id: 'TPOFFER.0.t270',
                header: 'Giá 1',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPOFFER?.[0]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPOFFER?.[0]?.t270,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên bán - KL 1
            {
                accessorKey: 'TPOFFER.0.t271',
                id: 'TPOFFER.0.t271',
                header: 'KL 1',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPOFFER?.[0]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPOFFER?.[0]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên bán - Giá 2
            {
                accessorKey: 'TPOFFER.1.t270',
                id: 'TPOFFER.1.t270',
                header: 'Giá 2',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPOFFER?.[1]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPOFFER?.[1]?.t270,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên bán - KL 2
            {
                accessorKey: 'TPOFFER.1.t271',
                id: 'TPOFFER.1.t271',
                header: 'KL 2',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPOFFER?.[1]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPOFFER?.[1]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên bán - Giá 3
            {
                accessorKey: 'TPOFFER.2.t270',
                id: 'TPOFFER.2.t270',
                header: 'Giá 3',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPOFFER?.[2]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPOFFER?.[2]?.t270,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Bên bán - KL 3
            {
                accessorKey: 'TPOFFER.2.t271',
                id: 'TPOFFER.2.t271',
                header: 'KL 3',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.TPOFFER?.[2]?.t270)}>
                    {FormatNumber({
                        value: row.original.TPOFFER?.[2]?.t271,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Cao
            {
                accessorKey: 't30562',
                id: 'highest',
                header: 'Cao',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.t30562)}>
                    {FormatNumber({
                        value: row.original.t30562,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // TB
            {
                accessorKey: 't40001',
                id: 'avg',
                header: 'TB',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.t40001)}>
                    {FormatNumber({
                        value: row.original.t40001,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Thấp
            {
                accessorKey: 't30563',
                id: 'lowest',
                header: 'Thấp',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => <span className={getColor(row.original.t20013, row.original?.t30563)}>
                    {FormatNumber({
                        value: row.original.t30563,
                        fractionSize: 2,
                        empty: 0,
                    })}
                </span>,
            },
            // Mua
            {
                accessorKey: 't30577',
                id: 'FR_volume_buy',
                header: 'Mua',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30577,
                    fractionSize: 2,
                    empty: 0,
                }),
            },
            // Bán
            {
                accessorKey: 't30578',
                id: 'FR_volume_sell',
                header: 'Bán',
                // size: 60,
                minSize: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30578,
                    fractionSize: 2,
                    empty: 0,
                }),

            }
        ],
        []
    );

    const table = useReactTable({
        data: Object.values(dataStockRef.current),
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
        count: Object.values(dataStockRef.current).length,
        estimateSize: () => 26, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef.current,
        measureElement:
            typeof window !== 'undefined' &&
                navigator.userAgent.indexOf('Firefox') === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 1000,
    })

    const getColor = (refPrice = 0, matchPrice = 0) => {
        if (refPrice < matchPrice) return " text-light-price-up dark:text-dark-price-up "
        if (refPrice > matchPrice) return " text-light-price-down dark:text-dark-price-down "
        if (refPrice === matchPrice) return " text-light-price-ref dark:text-dark-price-ref "
    }

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
                        const row = rows[virtualRow.index] as Row<StockData>;
                        return (
                            <tr
                                data-index={virtualRow.index} //needed for dynamic row height measurement
                                ref={(node) => rowVirtualizer?.measureElement(node)} //measure dynamic row height
                                key={row.id + "_" + row.original.t55 + "_" + virtualRow.index}
                                // style={{
                                //     display: 'flex',
                                //     flexDirection: 'row',
                                //     position: 'absolute',
                                //     transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                                //     width: '100%',
                                // }}
                                className="group"
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const rowIndex = row.index;
                                    const colId = cell.column.id;
                                    return (
                                        <td
                                            key={row.id + "_" + row.original.t55 + "_" + cell.id + "_" + virtualRow.index}
                                            className={getClassNames(colId, rowIndex)}
                                            style={{
                                                // display: 'flex',
                                                width: cell.column.getSize(),
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TablePriceboardV3;