import { ArrowDownOutlined, ArrowUpOutlined, CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";
import type { ISymbolData } from "../../interface/symbolRequest";
import FormatNumber from "../../utils/formater/FormatNumber";

type IndexTableProps = {
  indexSymbols: ISymbolData[]
}
const IndexTable: FC<IndexTableProps> = ({ indexSymbols = [] }) => {
  const [isShowChangePercent, setIsShowChangePercent] = useState(false);

  return (<>
    <table className="min-w-full border-separate divide-y divide-v3-line-light-1 dark:divide-dark-line text-outline 2xl:text-caption border-spacing-0">
      <thead>
        <tr>
          <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>
            <div className="flex items-center justify-center gap-1">Chỉ số </div>
          </th>
          <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>
            <div className="flex items-center justify-center gap-1">Điểm </div>
          </th>
          <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 60 }}>
            <div className="flex items-center justify-center gap-1">
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => setIsShowChangePercent(prev => !prev)} className="absolute cursor-pointer inset-y-0 flex items-center justify-center p-1 text-light-secondary dark:text-dark-secondary hover:text-light-primary-hover dark:hover:text-dark-primary-hover left-1">
                  <CaretLeftOutlined style={{ width: 8, height: 10 }} />
                </button>
                <span className="cursor-pointer">+/-</span>
                <button onClick={() => setIsShowChangePercent(prev => !prev)} className="absolute cursor-pointer inset-y-0 flex items-center justify-center p-1 text-light-secondary dark:text-dark-secondary hover:text-light-primary-hover dark:hover:text-dark-primary-hover right-1">
                  <CaretRightOutlined style={{ width: 8, height: 10 }} />
                </button>
              </div>
            </div>
          </th>
          <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 80 }}>
            <div className="flex items-center justify-center gap-1">KLGD </div>
          </th>
          <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 cursor-pointer select-none first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 85 }}>
            <div className="flex items-center justify-center gap-1">GTGD </div>
          </th>
          <th className="relative px-1 py-1 font-normal duration-150 border border-l-0 first:sticky first:left-0 first:z-10 group hover:text-light-primary-hover dark:hover:text-dark-primary-hover whitespace-nowrap 2xl:px-2 text-caption first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block bg-light-1 dark:bg-dark-1" style={{ width: 135 }}>
            <div className="flex items-center justify-center gap-1">Số CK Tăng/Giảm </div>
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-v3-line-light-1 dark:divide-dark-line">
        {indexSymbols.map((item, index) => (<tr key={index + item.code} className="bg-light-1 dark:bg-dark-1 odd:bg-light-3 dark:odd:bg-dark-3">
          <td className={"px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block "} style={{ width: 60 }}>
            {item.code}
          </td>
          <td className={"px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block "} style={{ width: 60 }}>
            <span className={item.price > Number(item.referPrice)
              ? "text-light-price-up dark:text-dark-price-up"
              : item.price < Number(item.referPrice)
                ? "text-light-price-down dark:text-dark-price-down"
                : "text-light-price-ref dark:text-dark-price-ref"}>{FormatNumber({ value: item.price, fractionSize: 2, empty: 0 })}</span>
          </td>
          <td className={"px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block "} style={{ width: 60 }}>
            <span className={item.price > Number(item.referPrice)
              ? "text-light-price-up dark:text-dark-price-up"
              : item.price < Number(item.referPrice)
                ? "text-light-price-down dark:text-dark-price-down"
                : "text-light-price-ref dark:text-dark-price-ref"}>{isShowChangePercent ? item.dayChangePercent + " %" : item.dayChange}</span>
          </td>
          <td className={"px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block "} style={{ width: 80 }}>
            {FormatNumber({ value: item.dayVolume ?? 0, fractionSize: 2, empty: 0, key: 'short', })}
          </td>
          <td className={"px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block "} style={{ width: 85 }}>
            {FormatNumber({ value: item.dayValue ?? 0, fractionSize: 2, empty: 0, key: 'short', })}
          </td>
          <td className={"px-1 py-1 font-medium text-right border border-t-0 border-l-0 2xl:px-2 first:sticky first:left-0 first:z-10 first:text-left whitespace-nowrap text-light-default dark:text-dark-default first:border-l border-light-line dark:border-dark-line last:hidden last:mxl:block "} style={{ width: 135 }}>
            <div className="grid grid-cols-3 gap-1 2xl:gap-2">
              <div className="grid items-center grid-cols-5 2xl:gap-1 text-light-price-up dark:text-dark-price-up">
                <span className="col-span-2">
                  <ArrowUpOutlined />
                </span>
                <div className="col-span-3 text-center">{FormatNumber({ value: item.advances ?? 0, fractionSize: 0, empty: 0 })}</div>
              </div>
              <div className="grid items-center w-full grid-cols-5 2xl:gap-1">
                <div className="col-span-3 text-center text-light-price-ref dark:text-dark-price-ref items-center">
                  {FormatNumber({ value: item.noChanges ?? 0, fractionSize: 0, empty: 0 })}
                </div>
              </div>
              <div className="-ml-1.5 grid grid-cols-5 2xl:gap-1 items-center text-light-price-down dark:text-dark-price-down">
                <span className="col-span-2">
                  <ArrowDownOutlined />
                </span>
                <div className="col-span-3 text-center">
                  {FormatNumber({ value: item.declines ?? 0, fractionSize: 0, empty: 0 })}
                </div>
              </div>
            </div>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </>)
}

export default IndexTable;
