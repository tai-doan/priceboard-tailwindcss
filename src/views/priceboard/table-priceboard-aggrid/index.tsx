import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type RowPinningState, type SortingState } from '@tanstack/react-table';
import { throttle } from 'lodash';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { StockData } from '../../../interface/stock';
import { usePriceboardSocketStore } from '../../../provider/priceboard-socket-store';
import { getNewItemsOnly, getOldItemsOnly } from '../../../utils';
import channels from '../../../utils/channels';
import { StockBoardComponent } from './stockboard';
import './styles/ag-grid.min.css';
import './styles/ag-theme-balham-dark.min.css';

const baseClass = "xl:pr-1 py-1 group-hover:bg-[#33343C3D] dark:group-hover:bg-[#33343C] relative text-caption first:border-t-0 border-r first:border-l border-light-line dark:border-dark-line text-right "

const TablePriceboardAGGrid = ({ indexCd = '' }: { indexCd: string }) => {
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
      },
      // Trần
      {
        accessorKey: 't1149',
        header: 'Trần',
        size: 40,
      },
      // Sàn
      {
        accessorKey: 't1148',
        header: 'Sàn',
        size: 40,
      },
      // TC
      {
        accessorKey: 't20013',
        header: 'TC',
        size: 40,
      },
      // Tổng KL
      {
        accessorKey: 't387',
        header: 'Tổng KL',
        size: 60,
      },
      // Bên mua - Giá 3
      {
        accessorKey: 'TPBID_0_t270',
        header: 'Giá 3',
        size: 60,
      },
      // Bên mua - KL 3
      {
        accessorKey: 'TPBID_0_t271',
        header: 'KL 3',
        size: 60,
      },
      // Bên mua - Giá 2
      {
        accessorKey: 'TPBID_1_t270',
        header: 'Giá 2',
        size: 60,
      },
      // Bên mua - KL 2
      {
        accessorKey: 'TPBID_1_t271',
        header: 'KL 2',
        size: 60,
      },
      // Bên mua - Giá 1
      {
        accessorKey: 'TPBID_2_t270',
        header: 'Giá 1',
        size: 60,
      },
      // Bên mua - KL 1
      {
        accessorKey: 'TPBID_2_t271',
        header: 'KL 1',
        size: 60,
      },
      // Khớp lệnh - Giá
      {
        accessorKey: 't270',
        header: 'Giá',
        size: 60,
      },
      // Khớp lệnh - KL
      {
        accessorKey: 't271',
        header: 'KL',
        size: 60,
      },
      // Khớp lệnh - +/-
      {
        accessorKey: 't270',
        header: '+/-',
        size: 60,
      },
      // Bên bán - Giá 1
      {
        accessorKey: 'TPOFFER_0_t270',
        header: 'Giá 1',
        size: 60,
      },
      // Bên bán - KL 1
      {
        accessorKey: 'TPOFFER_0_t271',
        header: 'KL 1',
        size: 60,
      },
      // Bên bán - Giá 2
      {
        accessorKey: 'TPOFFER_1_t270',
        header: 'Giá 2',
        size: 60,
      },
      // Bên bán - KL 2
      {
        accessorKey: 'TPOFFER_1_t271',
        header: 'KL 2',
        size: 60,
      },
      // Bên bán - Giá 3
      {
        accessorKey: 'TPOFFER_2_t270',
        header: 'Giá 3',
        size: 60,
      },
      // Bên bán - KL 3
      {
        accessorKey: 'TPOFFER_2_t271',
        header: 'KL 3',
        size: 60,
      },
      // Cao
      {
        accessorKey: 't30562',
        header: 'Cao',
        size: 60,
      },
      // TB
      {
        accessorKey: 't40001',
        header: 'TB',
        size: 60,
      },
      // Thấp
      {
        accessorKey: 't30563',
        header: 'Thấp',
        size: 60,
      },
      // Mua
      {
        accessorKey: 't30577',
        header: 'Mua',
        size: 60,
      },
      // Bán
      {
        accessorKey: 't30578',
        header: 'Bán',
        size: 60,
      }
    ],
    []
  );
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
      // if (data.topic.includes("KRXMDDS|SI|G1|") ||
      //     data.topic.includes("KRXMDDS|ST|G1|") ||
      //     data.topic.includes("KRXMDDS|TP|G1|") ||
      //     data.topic.includes("KRXMDDS|MT|G1|") ||
      //     data.topic.includes("KRXMDDS|MD|G1|")) {
      //     const stockKey = data.topic.split("|").slice(-1)[0];

      //     dataStockRef.current[stockKey] = {
      //         ...dataStockRef.current[stockKey],
      //         ...data.data
      //     };
      //     throttled.current();
      // }
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

  const getColor = useCallback((refPrice = 0, matchPrice = 0, rowData = {}) => {
    if (refPrice === matchPrice) return " text-light-price-ref dark:text-dark-price-ref "
    // @ts-ignore
    if (matchPrice === rowData.t1149) return " text-light-price-ceil dark:text-dark-price-ceil "
    // @ts-ignore
    if (matchPrice === rowData.t1148) return " text-light-price-floor dark:text-dark-price-floor "
    if (refPrice < matchPrice) return " text-light-price-up dark:text-dark-price-up "
    if (refPrice > matchPrice) return " text-light-price-down dark:text-dark-price-down "
  }, []);

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
        <StockBoardComponent
          symbols={stockList}
          indexCd={indexCd}
        />
      </div>
    </div>
  )
}

export default memo(TablePriceboardAGGrid, (prevProps, nextProps) => {
  return prevProps.indexCd === nextProps.indexCd
});