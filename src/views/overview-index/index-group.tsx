import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { createChart, LastPriceAnimationMode, type ChartOptions, type HistogramSeriesPartialOptions, type IChartApi } from "lightweight-charts";
import moment from "moment";
import { useEffect, useRef, type FC } from "react";
import type { ISymbolData } from "../../interface/symbolRequest";
import FormatNumber from "../../utils/formater/FormatNumber";

type IndexTableProps = {
    index: ISymbolData;
}

const volumeSeriesOptions: HistogramSeriesPartialOptions = {
    color: "#00AA00",
    priceFormat: {
        type: "volume",
    },
    priceScaleId: "",
    lastValueVisible: false,
    priceLineVisible: false,
    baseLineVisible: false,
};

const chartOptions = {
    autoSize: true,
    layout: {
        background: {
            type: "solid",
            color: "transparent"
        },
        textColor: "#C5C6D2",
        fontSize: 12,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif"
    },
    crosshair: {
        vertLine: {
            color: "#F3F5F6",
            width: 1,
            style: 3,
            visible: true,
            labelVisible: true,
            labelBackgroundColor: "#131722"
        },
        horzLine: {
            color: "#F3F5F6",
            width: 1,
            style: 3,
            visible: true,
            labelVisible: true,
            labelBackgroundColor: "#131722"
        },
        mode: 1
    },
    grid: {
        vertLines: {
            color: "transparent",
            style: 0,
            visible: true
        },
        horzLines: {
            color: "transparent",
            style: 0,
            visible: false
        }
    },
    overlayPriceScales: {
        show: false,
        autoScale: true,
        mode: 0,
        invertScale: false,
        alignLabels: true,
        borderVisible: true,
        borderColor: "#2B2B43",
        entireTextOnly: false,
        visible: false,
        ticksVisible: false,
        scaleMargins: {
            bottom: 0.1,
            top: 0.2
        },
        minimumWidth: 0
    },
    leftPriceScale: {
        autoScale: true,
        mode: 0,
        invertScale: false,
        alignLabels: true,
        borderVisible: false,
        borderColor: "transparent",
        entireTextOnly: false,
        visible: false,
        ticksVisible: false,
        scaleMargins: {
            bottom: 0,
            top: 0.5
        },
        minimumWidth: 0
    },
    rightPriceScale: {
        autoScale: true,
        mode: 0,
        invertScale: false,
        alignLabels: true,
        borderVisible: true,
        borderColor: "#F3F5F6",
        entireTextOnly: false,
        visible: false,
        ticksVisible: false,
        scaleMargins: {
            bottom: 0.1,
            top: 0.1
        },
        minimumWidth: 0
    },
    timeScale: {
        rightOffset: 0,
        barSpacing: 10,
        minBarSpacing: 0.5,
        fixLeftEdge: true,
        fixRightEdge: true,
        lockVisibleTimeRangeOnResize: false,
        rightBarStaysOnScroll: true,
        borderVisible: true,
        borderColor: "#F3F5F6",
        visible: true,
        timeVisible: true,
        secondsVisible: false,
        shiftVisibleRangeOnNewBar: true,
        ticksVisible: true,
        uniformDistribution: false,
        minimumHeight: 0,
    },
    watermark: {
        color: "#f89c1b4d",
        visible: true,
        fontSize: 18,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
        fontStyle: "",
        text: "LPB Security",
        horzAlign: "center",
        vertAlign: "center"
    },
    localization: {
        locale: "vi",
        dateFormat: "",
    },
    handleScroll: {
        mouseWheel: false,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true
    },
    handleScale: {
        axisPressedMouseMove: {
            time: false,
            price: false
        },
        axisDoubleClickReset: {
            time: false,
            price: false
        },
        mouseWheel: false,
        pinch: true
    },
    kineticScroll: {
        mouse: false,
        touch: true
    },
    trackingMode: {
        exitMode: 1
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

        // Cấu hình cho giá
        const lineData = data.map((item: any) => ({
            value: item.close,
            time: moment(item.time).valueOf(),
        })).sort((a: any, b: any) => a.time - b.time)

        const lineSeries = chart.addBaselineSeries({
            lineWidth: 1,
            lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
            topLineColor: 'rgb(11, 223, 57)',
            bottomLineColor: '#FD1414',
            baseValue: { type: 'price', price: lineData[0].value },
        });
        lineSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.1,
                bottom: 0.2,
            },
        });
        lineSeries.setData(lineData);

        // Cấu hình cho khối lượng
        const volumeData = data.map((item: any) => ({
            time: moment(item.time).valueOf(),
            value: item.volume,
            color: "#6e361a",
        })).sort((a: any, b: any) => a.time - b.time);
        const volumeSeries = chart.addHistogramSeries(volumeSeriesOptions);
        volumeSeries.priceScale().applyOptions({
            autoScale: true,
            scaleMargins: {
                top: 0.4,
                bottom: 0,
            },
        })
        volumeSeries.setData(volumeData);

        // Cấu hình scale để fit chart với container
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
            <div className="h-[90px] w-full 2xl:w-[320px] mt-2 border border-light-line dark:border-dark-line">
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
