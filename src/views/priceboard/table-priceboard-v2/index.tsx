import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePriceboardSocket from '../../../hooks/usePriceboardSocket';
import type { IStockSI, IStockST } from '../../../interface/stock';
import channels from '../../../utils/channels';

type StockData = IStockSI & IStockST

const TablePriceboardV2 = ({ indexCd = '' }: { indexCd: string }) => {
    const { socket, subscribeFunctWithControl } = usePriceboardSocket();
    // const [tableHeight, setTableHeight] = useState(500);
    const divRef = useRef(null);
    // const [sorting, setSorting] = useState<SortingState>([]);
    const columns = useMemo<Array<ColumnDef<StockData>>>(
        () => [
            {
                accessorKey: 't55',
                header: 't55',
                size: 40,
            },
            {
                accessorKey: 't1149',
                header: 't1149',
                size: 40,
            },
            {
                accessorKey: 't1148',
                header: 't1148',
                size: 40,
            },
            {
                accessorKey: 't20013',
                header: 't20013',
                size: 40,
            },
            {
                accessorKey: 't387',
                header: 't387',
                size: 40,
            },
        ]
        , []);
    const dataStockRef = useRef<{ [key: string]: StockData }>({});
    // const [dataStock, setDataStock] = useState<{ [key: string]: StockData }>({});

    const table = useReactTable({
        data: Object.values(dataStockRef.current),
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

            if (data.topic.includes("KRXMDDS|IGS|" + indexCd)) {
                console.log("!PRICEBOARD useEffect: ", data.data.STOCK.length, data.data.STOCK);

                if (!!data.data?.STOCK?.length) {
                    subscribeFunctWithControl!({
                        command: "SUB",
                        component: "PRICEBOARD",
                        topic: ["KRXMDDS|ST|G1", "KRXMDDS|SI|G1", "KRXMDDS|MT|G1", "KRXMDDS|TP|G1", "KRXMDDS|MD|G1"],
                        value: data.data.STOCK ?? [],
                    })
                }
            }
            if (data.topic.includes("KRXMDDS|SI|G1|")) {
                dataStockRef.current[data.topic.split("|").slice(-1)[0]] = {...dataStockRef.current[data.topic.split("|").slice(-1)[0]], ...data.data};
                // setDataStock({ ...dataStockRef.current })
                return
            }
            if (data.topic.includes("KRXMDDS|ST|G1|")) {
                dataStockRef.current[data.topic.split("|").slice(-1)[0]] = {...dataStockRef.current[data.topic.split("|").slice(-1)[0]], ...data.data};
                // setDataStock({ ...dataStockRef.current })
                return
            }
            if (data.topic.includes("KRXMDDS|TP|G1|")) {
                dataStockRef.current[data.topic.split("|").slice(-1)[0]] = {...dataStockRef.current[data.topic.split("|").slice(-1)[0]], ...data.data};
                // setDataStock({ ...dataStockRef.current })
                return
            }

            console.log("dataStockRef.current: ", dataStockRef.current);

        })

        return () => {
            socket?.off()
        }
    }, [socket])

    const getColor = (refPrice = 0, matchPrice = 0) => {
        if (refPrice < matchPrice) return " text-light-price-up dark:text-dark-price-up "
        if (refPrice > matchPrice) return " text-light-price-down dark:text-dark-price-down "
        if (refPrice === matchPrice) return " text-light-price-ref dark:text-dark-price-ref "
    }

    return (
        <div className='relative w-full h-full' ref={parentRef}>
            <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
                <table id="table-priceboard" className="w-full border-separate border-spacing-0" style={{
                    tableLayout: "fixed",
                    marginBottom: 0,
                    marginTop: 0,
                }}>
                    <thead className="sticky top-0 z-10 backdrop-filter backdrop-blur-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
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
                    </thead>
                    <tbody>
                        {virtualizer.getVirtualItems().map((virtualRow, index) => {
                            const row = rows[virtualRow.index];
                            return (
                                <tr
                                    key={row.id}
                                    className="group"
                                    style={{
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
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
        </div>
    )
}

export default TablePriceboardV2;