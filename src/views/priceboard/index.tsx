import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from "react";
import usePriceboardSocket from "../../hooks/usePriceboardSocket";
import { getChangedKeys, getLocalStorage, setLocalStorage } from "../../utils";
import channels from "../../utils/channels";
import { APP_CONSTANT } from "../../utils/constant";
import OverviewIndex from "../overview-index";
import Priceboard from "./priceboard";
import { usePriceboardSocketStore } from '../../provider/priceboard-socket-store';

const priceboardQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // refetchOnWindowFocus: false, // default: true
        },
    },
})

const PriceboardLayout = () => {
    const { socket, subscribeFunctWithControl } = usePriceboardSocketStore(s => s);

    useEffect(() => {
        if (!socket) return;
        // Kiểm tra version của danh sách mã CK
        subscribeFunctWithControl!({
            component: "PRICEBOARD",
            command: "SUB",
            topic: ["KRXMDDS|STKVER"],
            value: [""],
            onSuccess: () => {
                subscribeFunctWithControl!({
                    component: "PRICEBOARD",
                    command: "UNSUB",
                    topic: ["KRXMDDS|STKVER"],
                    value: [""],
                })
            }
        })

        socket?.on(channels.onFOSStream, (data) => {
            // Không xử lý data nếu không có topic
            if (!data || !data.topic) return
            // Xử lý data của stock version
            if (data.topic.includes("KRXMDDS|STKVER")) {
                const localVerStr = getLocalStorage(APP_CONSTANT.STOCK_VERSION) ?? "{}"
                const localVer = JSON.parse(localVerStr);
                const { INFO } = data?.data ?? [];
                if (localVer) {
                    const mapStkVer = INFO.reduce((acc: any, cur: any) => {
                        const key = cur['exchange']
                        if (!acc[key]) {
                            acc[key] = cur.version;
                        }
                        return acc
                    }, {})
                    const changeKeys = getChangedKeys(mapStkVer, localVer)
                    setLocalStorage(APP_CONSTANT.STOCK_VERSION, JSON.stringify(mapStkVer));
                    if (changeKeys.length) {
                        // Lấy danh sách sàn toàn bộ thị trường
                        subscribeFunctWithControl!({
                            component: "PRICEBOARD",
                            command: "SUB",
                            topic: ["KRXMDDS|IDX|STO", "KRXMDDS|IDX|STX", "KRXMDDS|IDX|UPX"],
                            value: [""],
                            onSuccess: () => {
                                subscribeFunctWithControl!({
                                    component: "PRICEBOARD",
                                    command: "UNSUB",
                                    topic: ["KRXMDDS|IDX|STO", "KRXMDDS|IDX|STX", "KRXMDDS|IDX|UPX"],
                                    value: [""],
                                })
                            }
                        })
                        subscribeFunctWithControl!({
                            component: "PRICEBOARD",
                            command: "SUB",
                            topic: changeKeys.map((item) => `KRXMDDS|STKLST|${item}|VI`),
                            value: [""],
                            onSuccess: () => {
                                subscribeFunctWithControl!({
                                    component: "PRICEBOARD",
                                    command: "UNSUB",
                                    topic: changeKeys.map((item) => `KRXMDDS|STKLST|${item}|VI`),
                                    value: [""],
                                })
                            }
                        })
                    }
                } else {
                    // Lấy danh sách sàn toàn bộ thị trường
                    subscribeFunctWithControl!({
                        component: "PRICEBOARD",
                        command: "SUB",
                        topic: ["KRXMDDS|IDX|STO", "KRXMDDS|IDX|STX", "KRXMDDS|IDX|UPX"],
                        value: [""],
                        onSuccess: () => {
                            subscribeFunctWithControl!({
                                component: "PRICEBOARD",
                                command: "UNSUB",
                                topic: ["KRXMDDS|IDX|STO", "KRXMDDS|IDX|STX", "KRXMDDS|IDX|UPX"],
                                value: [""],
                            })
                        }
                    })
                    const mapStkVer = INFO.map((item: any) => ({
                        [item.exchange]: item.version
                    }));
                    setLocalStorage(APP_CONSTANT.STOCK_VERSION, JSON.stringify(mapStkVer));
                    subscribeFunctWithControl!({
                        component: "PRICEBOARD",
                        command: "SUB",
                        topic: Object.keys(mapStkVer).map((item) => `KRXMDDS|STKLST|${item}|VI`),
                        value: [""],
                        onSuccess: () => {
                            subscribeFunctWithControl!({
                                component: "PRICEBOARD",
                                command: "UNSUB",
                                topic: Object.keys(mapStkVer).map((item) => `KRXMDDS|STKLST|${item}|VI`),
                                value: [""],
                            })
                        }
                    })
                }
            }

            if (data.topic.includes("KRXMDDS|STKLST")) {
                console.log("KRXMDDS|STKLST ", data);

            }
        })

        return () => {
            socket?.off()
        }
    }, [socket]);

    return (<QueryClientProvider client={priceboardQueryClient}>
        <div className="h-full space-y-4 overflow-hidden bg-light-1 dark:bg-dark-1">
            <OverviewIndex />
            <Priceboard />
        </div>
    </QueryClientProvider>)
}

export default PriceboardLayout;