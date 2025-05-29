import { DeleteOutlined, PushpinOutlined } from '@ant-design/icons';
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type RowPinningState, type SortingState } from '@tanstack/react-table';
import { throttle } from 'lodash';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import usePriceboardSocket from '../../../hooks/usePriceboardSocket';
import type { StockData } from '../../../interface/stock';
import { getNewItemsOnly, getOldItemsOnly } from '../../../utils';
import channels from '../../../utils/channels';
import FormatNumber from '../../../utils/formater/FormatNumber';
import HeaderTablePriceboard from '../table-priceboard/header-table-priceboard';
import PriceboardRow from './PriceboardRow';
import { usePriceboardSocketStore } from '../../../provider/priceboard-socket-store';

const baseClass = "xl:pr-1 py-1 group-hover:bg-[#33343C3D] dark:group-hover:bg-[#33343C] relative text-caption first:border-t-0 border-r first:border-l border-light-line dark:border-dark-line text-right "

const TablePriceboardV2 = ({ indexCd = '' }: { indexCd: string }) => {
    const { socket, subscribeFunctWithControl } = usePriceboardSocketStore();
    const [tableHeight, setTableHeight] = useState(500);
    const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
        top: [],
        bottom: [],
    })
    const [sorting, setSorting] = useState<SortingState>([]);
    const columns = useMemo<Array<ColumnDef<StockData>>>(
        () => [
            // Mã CK
            {
                accessorKey: 't55',
                header: 'Mã CK',
                size: 40,
                cell: ({ row, }) => (
                    <button className="w-full h-full px-2 text-left overflow-ellipsis overflow-hidden cursor-pointer" title={row.original.t55}>
                        {row.original.t55}
                        {row.getIsPinned()
                            ? <DeleteOutlined onClick={() => row.pin(false, true, false)} />
                            : <PushpinOutlined onClick={() => row.pin('top', true, false)} />}
                    </button>
                ),
                meta: {
                    className: "scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737]"
                }

            },
            // Trần
            {
                accessorKey: 't1149',
                header: 'Trần',
                size: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t1149,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-price-ceil dark:text-dark-price-ceil"
                }
            },
            // Sàn
            {
                accessorKey: 't1148',
                header: 'Sàn',
                size: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t1148,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-price-floor dark:text-dark-price-floor"
                }
            },
            // TC
            {
                accessorKey: 't20013',
                header: 'TC',
                size: 40,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t20013,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-price-ref dark:text-dark-price-ref"
                }
            },
            // Tổng KL
            {
                accessorKey: 't387',
                header: 'Tổng KL',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t387,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên mua - Giá 3
            {
                accessorKey: 'TPBID.0.t270',
                header: 'Giá 3',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[0]?.t270,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên mua - KL 3
            {
                accessorKey: 'TPBID.0.t271',
                header: 'KL 3',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[0]?.t271,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên mua - Giá 2
            {
                accessorKey: 'TPBID.1.t270',
                header: 'Giá 2',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[1]?.t270,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên mua - KL 2
            {
                accessorKey: 'TPBID.1.t271',
                header: 'KL 2',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[1]?.t271,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên mua - Giá 1
            {
                accessorKey: 'TPBID.2.t270',
                header: 'Giá 1',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[2]?.t270,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên mua - KL 1
            {
                accessorKey: 'TPBID.2.t271',
                header: 'KL 1',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPBID?.[2]?.t271,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Khớp lệnh - Giá
            {
                accessorKey: 't270',
                header: 'Giá',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t270,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Khớp lệnh - KL
            {
                accessorKey: 't271',
                header: 'KL',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t271,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Khớp lệnh - +/-
            {
                accessorKey: 't270',
                header: '+/-',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t270 - row.original.t20013,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên bán - Giá 1
            {
                accessorKey: 'TPOFFER.0.t270',
                header: 'Giá 1',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[0]?.t270,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên bán - KL 1
            {
                accessorKey: 'TPOFFER.0.t271',
                header: 'KL 1',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[0]?.t271,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên bán - Giá 2
            {
                accessorKey: 'TPOFFER.1.t270',
                header: 'Giá 2',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[1]?.t270,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên bán - KL 2
            {
                accessorKey: 'TPOFFER.1.t271',
                header: 'KL 2',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[1]?.t271,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên bán - Giá 3
            {
                accessorKey: 'TPOFFER.2.t270',
                header: 'Giá 3',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[2]?.t270,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bên bán - KL 3
            {
                accessorKey: 'TPOFFER.2.t271',
                header: 'KL 3',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.TPOFFER?.[2]?.t271,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Cao
            {
                accessorKey: 't30562',
                header: 'Cao',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30562,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-price-up dark:text-[#0BDF39]"
                }
            },
            // TB
            {
                accessorKey: 't40001',
                header: 'TB',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t40001,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Thấp
            {
                accessorKey: 't30563',
                header: 'Thấp',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30563,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-price-down dark:text-[#FF3737]"
                }
            },
            // Mua
            {
                accessorKey: 't30577',
                header: 'Mua',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30577,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            },
            // Bán
            {
                accessorKey: 't30578',
                header: 'Bán',
                size: 60,
                cell: ({ row }) => FormatNumber({
                    value: row.original.t30578,
                    fractionSize: 2,
                    empty: 0,
                }),
                meta: {
                    className: "text-light-default dark:text-dark-default"
                }
            }
        ],
        []
    );
    const dataStockRef = useRef<{ [key: string]: StockData }>({});
    const [tableData, setTableData] = useState<StockData[]>([]);
    const subStockList = useRef<string[]>([]);

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
                // console.log("getDifferenceString: ", subStockList.current, data.data.STOCK, "\n stockNeedSub: ", stockNeedSub, "\n stockNeedUNSub: ", stockNeedUNSub,);
                subStockList.current = data.data.STOCK
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

    // const parentRef = React.useRef<HTMLDivElement>(null);
    // const rowVirtualizer = useVirtualizer({
    //     count: rows.length,
    //     getScrollElement: () => parentRef.current,
    //     estimateSize: () => 26,
    //     overscan: 500,
    // });

    const getColor = (refPrice = 0, matchPrice = 0) => {
        if (refPrice < matchPrice) return " text-light-price-up dark:text-dark-price-up "
        if (refPrice > matchPrice) return " text-light-price-down dark:text-dark-price-down "
        if (refPrice === matchPrice) return " text-light-price-ref dark:text-dark-price-ref "
    }

    return (
        <div
            className='relative overflow-hidden'
            // ref={parentRef}
            style={{ height: tableHeight }}
        >
            <div
                className={`relative overflow-auto mac-scrollbar !h-full`}
                style={{ maxHeight: Math.max(tableHeight, rows.length * 26) }}
            >
                <table id="table-priceboard" className="w-full border-separate border-spacing-0" style={{
                    tableLayout: "fixed",
                    marginBottom: 0,
                    marginTop: 0,
                }}>
                    <HeaderTablePriceboard />
                    <tbody>
                        {table.getTopRows().map((row, index) => {
                            return (
                                <PriceboardRow
                                    row={row}
                                    rowData={row.original}
                                    key={row.original.t55}
                                    index={index}
                                    baseClass={baseClass}
                                    getColor={getColor}
                                    isLast={index === table.getTopRows().length - 1}
                                />
                            );
                        })}
                        {table.getCenterRows().map((row, index) => {
                            return (
                                <PriceboardRow
                                    row={row}
                                    rowData={row.original}
                                    key={row.original.t55}
                                    index={index}
                                    baseClass={baseClass}
                                    getColor={getColor}
                                />
                            );
                        })}
                        {/* {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
                            const row = rows[virtualRow.index];
                            return (
                                <PriceboardRow
                                    isShowPin={false}
                                    row={row}
                                    rowData={row.original}
                                    key={row.original.t55}
                                    virtualRow={virtualRow}
                                    index={index}
                                    baseClass={baseClass}
                                    getColor={getColor}
                                />
                            );
                        })} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(TablePriceboardV2, (prevProps, nextProps) => {
    return prevProps.indexCd === nextProps.indexCd
});