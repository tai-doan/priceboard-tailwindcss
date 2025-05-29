import { useEffect } from "react";
import usePrevious from "../../../hooks/usePrevious";
import usePriceboardSocket from "../../../hooks/usePriceboardSocket";
import useSafeState from "../../../hooks/useSafeState";
import channels from "../../../utils/channels";
import RowTablePriceboard from "./row-table-priceboard";
import { usePriceboardSocketStore } from "../../../provider/priceboard-socket-store";

const BodyTablePriceboard = ({ indexCd = '' }: { indexCd: string }) => {
    const { socket, subscribeFunctWithControl, } = usePriceboardSocketStore();
    const [stockList, setStockList] = useSafeState([]);
    const previousStockList = usePrevious(stockList);

    useEffect(() => {
        console.log("!PRICEBOARD useEffect:", socket, indexCd);

        if (!socket) return;
        setStockList([]);
        socket?.on(channels.onFOSStream, (data) => {
            // Không xử lý data nếu không có topic
            if (!data || !data.topic) return
            if (data.topic.includes("KRXMDDS|IGS|" + indexCd)) {
                setStockList(data.data.STOCK);
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
        })

        return () => {
            socket?.off()
        }
    }, [socket]);

    useEffect(() => {
        subscribeFunctWithControl!({
            command: "UNSUB",
            component: "PRICEBOARD",
            topic: ["KRXMDDS|ST|G1", "KRXMDDS|SI|G1", "KRXMDDS|MT|G1", "KRXMDDS|TP|G1", "KRXMDDS|MD|G1"],
            value: previousStockList ?? [],
        })
        return () => {
        }
    }, [indexCd])

    return (
        <tbody>
            {stockList.map((item: string, index: number) => (
                <RowTablePriceboard key={item} index={index} stock={item} />
            ))}
        </tbody>
    )
}

export default BodyTablePriceboard;
