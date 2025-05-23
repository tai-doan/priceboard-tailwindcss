import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import type { FC } from "react";
import type { ISymbolData } from "../../interface/symbolRequest";
import FormatNumber from "../../utils/formater/FormatNumber";

type IndexTableProps = {
    index: ISymbolData;
}

const IndexGroup: FC<IndexTableProps> = ({ index = {} as ISymbolData }) => {
    return (
        <div className="snap-start flex-shrink-0 max-w-[222px] 2xl:max-w-fit px-2 rounded-md bg-[#dfdfdf20] dark:bg-[#2e2e2e]">
            <div className="h-[90px] mt-2 border border-light-line dark:border-dark-line w-[320]">
                <div className="relative w-full h-full">
                    <div id="chart-VNIndex" className="relative w-full h-full">
                        {/* Vẽ chart ở đây */}
                        <div
                            className="tv-lightweight-charts"
                            style={{
                                overflow: "hidden",
                                direction: "ltr",
                                width: 358,
                                height: 88,
                                WebkitUserSelect: "none"
                            }}
                        >
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center py-1">
                <div className="flex items-center gap-1">
                    <span className="flex-shrink-0 font-bold">{index.code}</span>
                    <div
                        className={"flex items-center flex-shrink-0 gap-1 " +
                            (index.price > Number(index.referPrice)
                                ? " text-light-price-up dark:text-dark-price-up"
                                : index.price < Number(index.referPrice)
                                    ? " text-light-price-down dark:text-dark-price-down"
                                    : " text-light-price-ref dark:text-dark-price-ref")
                        }
                    >
                        {index.price > Number(index.referPrice)
                            ? <ArrowUpOutlined /> :
                            index.price < Number(index.referPrice)
                                ? <ArrowDownOutlined />
                                : <></>}
                        <span>{FormatNumber({ value: index.price, fractionSize: 2, empty: 0 })}</span>
                        <div>{`(${FormatNumber({ value: index.dayChange, fractionSize: 2, empty: 0 })} ${FormatNumber({ value: index.dayChangePercent, fractionSize: 2, empty: 0 })}%)`}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span>{FormatNumber({ value: index.dayVolume ?? 0, fractionSize: 2, empty: 0 })} CP</span>
                    <span>{FormatNumber({ value: index.dayValue ?? 0, fractionSize: 2, empty: 0, key: 'short' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-light-price-up dark:text-dark-price-up">
                        <ArrowUpOutlined />
                        {FormatNumber({ value: index.advances ?? 0, fractionSize: 0, empty: 0 })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-light-price-ref dark:text-dark-price-ref">
                        {FormatNumber({ value: index.noChanges ?? 0, fractionSize: 0, empty: 0 })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-light-price-down dark:text-dark-price-down">
                        <ArrowDownOutlined />
                        {FormatNumber({ value: index.declines ?? 0, fractionSize: 0, empty: 0 })}
                    </span>
                    <span className="text-light-price-floor dark:text-dark-price-floor">
                        ({FormatNumber({ value: index.floor ?? 0, fractionSize: 0, empty: 0 })})
                    </span>
                    <span>{index.marketStatus === 'open' ? 'Mở cửa' : 'Đóng cửa'}</span>
                </div>
            </div>
        </div>

    )
}

export default IndexGroup;
