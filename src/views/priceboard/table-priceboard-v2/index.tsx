import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePriceboardSocket from '../../../hooks/usePriceboardSocket';
import type { IStockSI, IStockST, IStockTP } from '../../../interface/stock';
import channels from '../../../utils/channels';
import FormatNumber from '../../../utils/formater/FormatNumber';
import HeaderTablePriceboard from '../table-priceboard/header-table-priceboard';

type StockData = IStockSI & IStockST & IStockTP;
const baseClass = "xl:pr-1 py-1 group-hover:bg-[#33343C3D] dark:group-hover:bg-[#33343C] relative text-caption first:border-t-0 border-r first:border-l border-light-line dark:border-dark-line text-right "

const TablePriceboardV2 = ({ indexCd = '' }: { indexCd: string }) => {
    const { socket, subscribeFunctWithControl } = usePriceboardSocket();
    // const [tableHeight, setTableHeight] = useState(500);
    const divRef = useRef(null);
    // const [sorting, setSorting] = useState<SortingState>([]);
    const columns = useMemo<Array<ColumnDef<StockData>>>(
        () => [
            // Mã CK
            {
                accessorKey: 't55',
                header: 'Mã CK',
                size: 40,
                cell: ({ row }) => (
                    <button className="w-full h-full px-2 text-left overflow-ellipsis overflow-hidden cursor-pointer" title={row.original.t55}>
                        {row.original.t55}
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

    const table = useReactTable({
        data: tableData,
        columns,
        // state: {
        //     sorting,
        // },
        // onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: false,
    });

    const { rows } = table.getRowModel();

    const parentRef = React.useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 26,
        overscan: 20,
    });

    // useEffect(() => {
    //     const handleResize = () => {
    //         const { top } = document.getElementById("table-priceboard")!.getBoundingClientRect();
    //         const { height } = document.getElementById("priceboard-layout")!.getBoundingClientRect();

    //         if (!!height && !!top) {
    //             setTableHeight(height - top + 28);
    //         }
    //     }
    //     handleResize();
    //     document.addEventListener("resize", handleResize);

    //     return () => {
    //         document.removeEventListener("resize", handleResize);
    //     }
    // }, [])

    useEffect(() => {
        if (!socket) return;

        socket?.on(channels.onFOSStream, (data) => {
            // Không xử lý data nếu không có topic
            if (!data || !data.topic) return

            console.log("!PRICEBOARD", data);

            if (data.topic.includes("KRXMDDS|IGS|" + indexCd)) {
                console.log("!PRICEBOARD useEffect: ", data.data.STOCK.length, data.data.STOCK);

                if (!!data.data?.STOCK?.length) {
                    dataStockRef.current = {};
                    setTableData([]);
                    subscribeFunctWithControl!({
                        command: "SUB",
                        component: "PRICEBOARD",
                        topic: ["KRXMDDS|ST|G1", "KRXMDDS|SI|G1", "KRXMDDS|MT|G1", "KRXMDDS|TP|G1", "KRXMDDS|MD|G1"],
                        value: data.data.STOCK ?? [],
                    })
                }
            }
            if (data.topic.includes("KRXMDDS|SI|G1|")) {
                dataStockRef.current[data.topic.split("|").slice(-1)[0]] = { ...dataStockRef.current[data.topic.split("|").slice(-1)[0]], ...data.data };
                // setDataStock({ ...dataStockRef.current })
                setTableData(Object.values(dataStockRef.current));
                return
            }
            if (data.topic.includes("KRXMDDS|ST|G1|")) {
                dataStockRef.current[data.topic.split("|").slice(-1)[0]] = { ...dataStockRef.current[data.topic.split("|").slice(-1)[0]], ...data.data };
                // setDataStock({ ...dataStockRef.current })
                setTableData(Object.values(dataStockRef.current));
                return
            }
            if (data.topic.includes("KRXMDDS|TP|G1|")) {
                dataStockRef.current[data.topic.split("|").slice(-1)[0]] = { ...dataStockRef.current[data.topic.split("|").slice(-1)[0]], ...data.data };
                // setDataStock({ ...dataStockRef.current })
                setTableData(Object.values(dataStockRef.current));
                return
            }

            console.log("dataStockRef.current: ", dataStockRef.current);

        })

        return () => {
            socket?.off()
        }
    }, [socket])

    // Update the data when dataStockRef changes
    useEffect(() => {
        console.log("tableData: ", tableData.length, JSON.parse(JSON.stringify(tableData)));

    }, [tableData]);

    const getColor = (refPrice = 0, matchPrice = 0) => {
        if (refPrice < matchPrice) return " text-light-price-up dark:text-dark-price-up "
        if (refPrice > matchPrice) return " text-light-price-down dark:text-dark-price-down "
        if (refPrice === matchPrice) return " text-light-price-ref dark:text-dark-price-ref "
    }

    return (
        <div className='relative w-full h-full' ref={parentRef}>
            <div className="relative overflow-auto mac-scrollbar" style={{ height: `${virtualizer.getTotalSize()}px` }}>
                <table id="table-priceboard" className="w-full border-separate border-spacing-0" style={{
                    tableLayout: "fixed",
                    marginBottom: 0,
                    marginTop: 0,
                }}>
                    {/* <thead className="sticky top-0 z-10 backdrop-filter backdrop-blur-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id + header.id + + "_" + headerGroup.id}
                                            colSpan={header.colSpan}
                                            style={{ width: header.getSize() }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead> */}
                    <HeaderTablePriceboard />
                    <tbody>
                        {virtualizer.getVirtualItems().map((virtualRow, index) => {
                            const row = rows[virtualRow.index];
                            return (
                                <tr
                                    key={row.original.t55}
                                    className="group"
                                    style={{
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                                    }}
                                >
                                    {/* Mã CK */}
                                    <td
                                        className={getColor(row.original.t20013, row.original.t270) + "scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737] " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-state="closed">
                                        <button className="w-full h-full px-2 text-left overflow-ellipsis overflow-hidden cursor-pointer " title={row.original.t55}>{row.original.t55}</button>
                                    </td>
                                    {/* Trần sàn tc */}
                                    <td
                                        className={baseClass + " text-light-price-ceil dark:text-dark-price-ceil " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_ceiling">
                                        {FormatNumber({
                                            value: row.original.t1149,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + " text-light-price-floor dark:text-dark-price-floor " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_floor">
                                        {FormatNumber({
                                            value: row.original.t1148,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + " text-light-price-ref dark:text-dark-price-ref " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_referPrice">
                                        {FormatNumber({
                                            value: row.original.t20013,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    {/* KL/GT giao dịch */}
                                    <td
                                        className={baseClass + " text-light-default dark:text-dark-default " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="overview_dayVolume"
                                        id="cell-value-0_overview_dayVolume">
                                        {FormatNumber({
                                            value: row.original.t387,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + " text-light-default dark:text-dark-default hidden " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="overview_dayValue"
                                        id="cell-value-0_overview_dayValue">
                                        {FormatNumber({
                                            value: row.original.t381,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    {/* Bên mua */}
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPBID?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_bids_2_price"
                                        id="cell-value-0_orderbook_bids_2_price">
                                        {FormatNumber({
                                            value: row?.original?.TPBID?.[0]?.t270,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPBID?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_bids_2_volume"
                                        id="cell-value-0_orderbook_bids_2_volume">
                                        {FormatNumber({
                                            value: row?.original?.TPBID?.[0]?.t271,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPBID?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_bids_1_price"
                                        id="cell-value-0_orderbook_bids_1_price">
                                        {FormatNumber({
                                            value: row?.original?.TPBID?.[1]?.t270,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPBID?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_bids_1_volume"
                                        id="cell-value-0_orderbook_bids_1_volume">
                                        {FormatNumber({
                                            value: row?.original?.TPBID?.[1]?.t271,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPBID?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_bids_0_price"
                                        id="cell-value-0_orderbook_bids_0_price">
                                        {FormatNumber({
                                            value: row?.original?.TPBID?.[2]?.t270,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPBID?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_bids_0_volume"
                                        id="cell-value-0_orderbook_bids_0_volume">
                                        {FormatNumber({
                                            value: row?.original?.TPBID?.[2]?.t271,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    {/* Khớp */}
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row.original.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_price">
                                        {FormatNumber({
                                            value: row.original.t270,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row.original.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_volume">
                                        {FormatNumber({
                                            value: row.original.t271,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row.original.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        data-col="overview_dayChange"
                                        id="cell-value-0_overview_dayChange">
                                        {FormatNumber({
                                            value: row.original.t270 - row.original.t20013,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + " dark:text-[#FF3737] hidden " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        data-col="overview_dayChangePercent"
                                        id="cell-value-0_overview_dayChangePercent">
                                        {FormatNumber({
                                            value: (row.original.t270 - row.original.t20013) / row.original.t20013 * 100,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    {/* Bên bán */}
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPOFFER?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_asks_0_price"
                                        id="cell-value-0_orderbook_asks_0_price">
                                        {FormatNumber({
                                            value: row?.original?.TPOFFER?.[0]?.t270,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPOFFER?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_asks_0_volume"
                                        id="cell-value-0_orderbook_asks_0_volume">
                                        {FormatNumber({
                                            value: row?.original?.TPOFFER?.[0]?.t271,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPOFFER?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_asks_1_price"
                                        id="cell-value-0_orderbook_asks_1_price">
                                        {FormatNumber({
                                            value: row?.original?.TPOFFER?.[1]?.t270,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPOFFER?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_asks_1_volume"
                                        id="cell-value-0_orderbook_asks_1_volume">
                                        {FormatNumber({
                                            value: row?.original?.TPOFFER?.[1]?.t271,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPOFFER?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_asks_2_price"
                                        id="cell-value-0_orderbook_asks_2_price">
                                        {FormatNumber({
                                            value: row?.original?.TPOFFER?.[2]?.t270,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row?.original?.TPOFFER?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        data-col="orderbook_asks_2_volume"
                                        id="cell-value-0_orderbook_asks_2_volume">
                                        {FormatNumber({
                                            value: row?.original?.TPOFFER?.[2]?.t271,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    {/* Cao thấp trung bình */}
                                    <td
                                        className={baseClass + " text-light-price-up dark:text-[#0BDF39] " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_highPrice">
                                        {FormatNumber({
                                            value: row.original.t30562,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + getColor(row.original.t20013, row.original.t40001) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_avgPrice">
                                        {FormatNumber({
                                            value: row.original.t40001,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + " text-light-price-down dark:text-[#FF3737] " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                                        id="cell-value-0_overview_lowPrice">
                                        {FormatNumber({
                                            value: row.original.t30563,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    {/* RoomNN */}
                                    <td
                                        className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        id="cell-value-0_room_buyVol">
                                        {FormatNumber({
                                            value: row.original.t30577,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                    <td
                                        className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                                        id="cell-value-0_room_sellVol">
                                        {FormatNumber({
                                            value: row.original.t30578,
                                            fractionSize: 2,
                                            empty: 0,
                                        })}
                                    </td>
                                </tr>
                                // <tr
                                //     key={row.id + "_" + index}
                                //     className="group"
                                //     style={{
                                //         height: `${virtualRow.size}px`,
                                //         transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                                //     }}
                                // >
                                //     {row.getVisibleCells().map((cell) => {
                                //         return (
                                //             <td key={cell.id} className={""}>
                                //                 {flexRender(
                                //                     cell.column.columnDef.cell,
                                //                     cell.getContext()
                                //                 )}
                                //             </td>
                                //         );
                                //     })}
                                // </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablePriceboardV2;