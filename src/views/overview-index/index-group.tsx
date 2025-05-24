import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { createChart, type CandlestickSeriesPartialOptions, type ChartOptions, type HistogramSeriesPartialOptions, type IChartApi, } from "lightweight-charts";
import moment from "moment";
import { useEffect, useRef, type FC } from "react";
import type { ISymbolData } from "../../interface/symbolRequest";
import FormatNumber from "../../utils/formater/FormatNumber";

type IndexTableProps = {
    index: ISymbolData;
}

const candlestickOptions: CandlestickSeriesPartialOptions = {
    upColor: "#00AA00",
    downColor: "#FD1414",
    borderVisible: false,
    wickUpColor: "#00AA00",
    wickDownColor: "#FD1414",
    lastValueVisible: false,
    priceLineVisible: false,
    baseLineVisible: false,
};

const volumeSeriesOptions: HistogramSeriesPartialOptions = {
    color: "#00AA00",
    priceFormat: {
        type: "volume",
    },
    priceScaleId: "", // set as an overlay by setting a blank priceScaleId
    lastValueVisible: false,
    priceLineVisible: false,
    baseLineVisible: false,
};

const chartOptions = {
    autoSize: true,
    // width: 240,
    layout: {
        background: { type: "solid", color: 'transparent' },
    },
    rightPriceScale: false,
    priceScale: {
        visible: false, // Ẩn price scale
    },
    timeScale: {
        visible: false,
    },
    localization: {
        locale: "vi-VN",
        dateFormat: "HH:mm:ss",
    },
    handleScale: false,
    handleScroll: false,
    crosshair: {
        horzLine: { visible: false, labelVisible: false },
        vertLine: { labelVisible: false },
    },
    grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
    },
    priceLineWidth: 1,
    baseLineWidth: 0,
    lastValueVisible: false,
    priceLineVisible: false,
    baseLineVisible: false,
    visible: false,
    priceLineSource: {
        lastVisible: 0,
        lastBar: 1,
    }
};

const IndexGroup: FC<IndexTableProps> = ({ index = {} as ISymbolData }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const { isPending, error, data, isFetching, isSuccess } = useQuery({
        queryKey: ["FETCH_INDEX_BARS", index.code],
        queryFn: async () => {
            const response = await fetch(`https://api.finpath.vn/api/indexes/periodbars/${index.code}?type=inDay&timeframe=1m&countBack=400`)
            const _res = await response.json();
            return _res.data.bars;
        },
    });

    useEffect(() => {
        if (!data || !data.length || !chartContainerRef.current) return;
        const chart: IChartApi = createChart(chartContainerRef.current, chartOptions as unknown as ChartOptions);

        // const candlestickSeries = chart.addCandlestickSeries(candlestickOptions);
        // candlestickSeries.priceScale().applyOptions({
        //     scaleMargins: {
        //         top: 0.1,
        //         bottom: 0.3,
        //     },
        // });
        // const candleStickData = data.map((item: any) => ({
        //     // ...item,
        //     open: item.open,
        //     high: item.highest,
        //     low: item.lowest,
        //     close: item.close,
        //     time: moment(item.time).valueOf(),
        // })).sort((a: any, b: any) => a.time - b.time)
        // candlestickSeries.setData(candleStickData);
        // console.log("candle data: ", candleStickData);

        const lineSeries = chart.addLineSeries({ color: '#0bdf39', lineWidth: 1, });
        const lineData = data.map((item: any) => ({
            value: item.close,
            time: moment(item.time).valueOf(),
            color: item.close >= item.open ? "#0bdf39" : "E04040"
        })).sort((a: any, b: any) => a.time - b.time)
        lineSeries.setData(lineData);

        const volumeSeries = chart.addHistogramSeries(volumeSeriesOptions);
        volumeSeries.priceScale().applyOptions({
            autoScale: false,
            scaleMargins: {
                top: 0.8, // highest point of the series will be 80% away from the top
                bottom: 0,
            },
        })
        const volumeData = data.map((item: any) => ({
            time: moment(item.time).valueOf(),
            value: item.volume,
            color: "#fff",
        })).sort((a: any, b: any) => a.time - b.time);
        volumeSeries.setData(volumeData);

        chart.timeScale().fitContent();
        const handleResize = () => {
            chart.timeScale().fitContent();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [data]);

    return (
        <div className="snap-start flex-shrink-0 max-w-[222px] 2xl:max-w-fit px-2 rounded-md bg-[#dfdfdf20] dark:bg-[#2e2e2e]">
            <div className="h-[90px] mt-2 border border-light-line dark:border-dark-line w-[320px]">
                <div ref={chartContainerRef} className="relative w-full h-full" />
            </div>
            <div className="flex flex-col items-center justify-center py-1">
                <div className="flex content-between w-full gap-1">
                    <span className="flex-1 font-bold">{index.code}</span>
                    <div
                        className={"flex flex-shrink-0 items-center gap-1 " +
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
