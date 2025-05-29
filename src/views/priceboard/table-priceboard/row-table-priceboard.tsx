import { useEffect, useRef } from "react";
import usePriceboardSocket from "../../../hooks/usePriceboardSocket";
import useSafeState from "../../../hooks/useSafeState";
import { MarketTPDataParser, type IStockSI, type IStockST, type IStockTP } from "../../../interface/stock";
import channels from "../../../utils/channels";
import FormatNumber from "../../../utils/formater/FormatNumber";
import { usePriceboardSocketStore } from "../../../provider/priceboard-socket-store";

const baseClass = "xl:pr-1 py-1 group-hover:bg-[#33343C3D] dark:group-hover:bg-[#33343C] relative text-caption first:border-t-0 border-r first:border-l border-light-line dark:border-dark-line text-right "

const RowTablePriceboard = ({ stock = '', index = 0 }: { stock: string, index: number }) => {
    const { socket, } = usePriceboardSocketStore();
    const dataStockRef = useRef<IStockSI & IStockST>({} as any);
    const [dataStock, setDataStock] = useSafeState<IStockSI & IStockST>({} as any);
    const [dataSI, setDataSI] = useSafeState<IStockSI>({} as IStockSI);
    const [dataST, setDataST] = useSafeState<IStockST>({} as IStockST);
    const [dataTP, setDataTP] = useSafeState<IStockTP>({} as IStockTP);

    useEffect(() => {
        if (!socket || !stock) return;

        socket?.on(channels.onFOSStream, (data) => {
            // Không xử lý data nếu không có topic
            if (!data || !data.topic) return
            if (data.topic.includes("KRXMDDS|SI|G1|" + stock)) {
                setDataSI(data.data);
                dataStockRef.current = { ...dataStockRef.current, ...data.data }
                setDataStock({ ...dataStockRef.current })
                return
            }
            if (data.topic.includes("KRXMDDS|ST|G1|" + stock)) {
                setDataST(data.data);
                dataStockRef.current = { ...dataStockRef.current, ...data.data }
                setDataStock({ ...dataStockRef.current })
                return
            }
            if (data.topic.includes("KRXMDDS|TP|G1|" + stock)) {
                setDataTP(data.data);
                dataStockRef.current = { ...dataStockRef.current, ...new MarketTPDataParser(data.data).getData() }
                setDataStock({ ...dataStockRef.current })
                return
            }
        })

        return () => {
            socket?.off()
        }
    }, [stock, socket])

    const getColor = (refPrice = 0, matchPrice = 0) => {
        if (refPrice < matchPrice) return " text-light-price-up dark:text-dark-price-up "
        if (refPrice > matchPrice) return " text-light-price-down dark:text-dark-price-down "
        if (refPrice === matchPrice) return " text-light-price-ref dark:text-dark-price-ref "
    }

    return (
        <tr key={stock} className="group" data-scroll-page={index} id={stock}>
            {/* Mã CK */}
            <td
                className={getColor(dataST.t20013, dataSI.t270) + "scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737] " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-state="closed">
                <button className="w-full h-full px-2 text-left overflow-ellipsis overflow-hidden cursor-pointer " title={stock}>{stock}</button>
            </td>
            {/* Trần sàn tc */}
            <td
                className={baseClass + " text-light-price-ceil dark:text-dark-price-ceil " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_ceiling">
                {FormatNumber({
                    value: dataST.t1149,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + " text-light-price-floor dark:text-dark-price-floor " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_floor">
                {FormatNumber({
                    value: dataST.t1148,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + " text-light-price-ref dark:text-dark-price-ref " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_referPrice">
                {FormatNumber({
                    value: dataST.t20013,
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
                    value: dataSI.t387,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + " text-light-default dark:text-dark-default hidden " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="overview_dayValue"
                id="cell-value-0_overview_dayValue">
                {FormatNumber({
                    value: dataSI.t381,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            {/* Bên mua */}
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPBID?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_bids_2_price"
                id="cell-value-0_orderbook_bids_2_price">
                {FormatNumber({
                    value: dataTP?.TPBID?.[0]?.t270,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPBID?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_bids_2_volume"
                id="cell-value-0_orderbook_bids_2_volume">
                {FormatNumber({
                    value: dataTP?.TPBID?.[0]?.t271,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPBID?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_bids_1_price"
                id="cell-value-0_orderbook_bids_1_price">
                {FormatNumber({
                    value: dataTP?.TPBID?.[1]?.t270,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPBID?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_bids_1_volume"
                id="cell-value-0_orderbook_bids_1_volume">
                {FormatNumber({
                    value: dataTP?.TPBID?.[1]?.t271,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPBID?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_bids_0_price"
                id="cell-value-0_orderbook_bids_0_price">
                {FormatNumber({
                    value: dataTP?.TPBID?.[2]?.t270,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPBID?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_bids_0_volume"
                id="cell-value-0_orderbook_bids_0_volume">
                {FormatNumber({
                    value: dataTP?.TPBID?.[2]?.t271,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            {/* Khớp */}
            <td
                className={baseClass + getColor(dataST.t20013, dataSI.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_price">
                {FormatNumber({
                    value: dataSI.t270,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataSI.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_volume">
                {FormatNumber({
                    value: dataStock.t271,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataSI.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                data-col="overview_dayChange"
                id="cell-value-0_overview_dayChange">
                {FormatNumber({
                    value: dataSI.t270 - dataST.t20013,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + " dark:text-[#FF3737] hidden " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                data-col="overview_dayChangePercent"
                id="cell-value-0_overview_dayChangePercent">
                {FormatNumber({
                    value: (dataSI.t270 - dataST.t20013) / dataST.t20013 * 100,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            {/* Bên bán */}
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPOFFER?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_asks_0_price"
                id="cell-value-0_orderbook_asks_0_price">
                {FormatNumber({
                    value: dataTP?.TPOFFER?.[0]?.t270,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPOFFER?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_asks_0_volume"
                id="cell-value-0_orderbook_asks_0_volume">
                {FormatNumber({
                    value: dataTP?.TPOFFER?.[0]?.t271,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPOFFER?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_asks_1_price"
                id="cell-value-0_orderbook_asks_1_price">
                {FormatNumber({
                    value: dataTP?.TPOFFER?.[1]?.t270,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPOFFER?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_asks_1_volume"
                id="cell-value-0_orderbook_asks_1_volume">
                {FormatNumber({
                    value: dataTP?.TPOFFER?.[1]?.t271,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPOFFER?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_asks_2_price"
                id="cell-value-0_orderbook_asks_2_price">
                {FormatNumber({
                    value: dataTP?.TPOFFER?.[2]?.t270,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataTP?.TPOFFER?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                data-col="orderbook_asks_2_volume"
                id="cell-value-0_orderbook_asks_2_volume">
                {FormatNumber({
                    value: dataTP?.TPOFFER?.[2]?.t271,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            {/* Cao thấp trung bình */}
            <td
                className={baseClass + " text-light-price-up dark:text-[#0BDF39] " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_highPrice">
                {FormatNumber({
                    value: dataSI.t30562,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + getColor(dataST.t20013, dataSI.t40001) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_avgPrice">
                {FormatNumber({
                    value: dataSI.t40001,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + " text-light-price-down dark:text-[#FF3737] " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id="cell-value-0_overview_lowPrice">
                {FormatNumber({
                    value: dataSI.t30563,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            {/* RoomNN */}
            <td
                className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id="cell-value-0_room_buyVol">
                {FormatNumber({
                    value: dataSI.t30577,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
            <td
                className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id="cell-value-0_room_sellVol">
                {FormatNumber({
                    value: dataSI.t30578,
                    fractionSize: 2,
                    empty: 0,
                })}
            </td>
        </tr>
    )
}

export default RowTablePriceboard;
