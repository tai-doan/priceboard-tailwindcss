

const BodyTablePriceboard = () => {
    return (
        <tbody>
            {Array.from({ length: 40 }, (_, i) => (
                <tr key={i} className="group" data-scroll-page="0" id="ACB">
                    <td
                        className={"scroll-mt-[52px] border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-caption text-[13px] font-bold group-hover:!bg-[#e0ecff] dark:group-hover:!bg-[#17253a] sticky left-0 z-[1] text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-state="closed">
                        <button className="w-full h-full px-2 text-left">ACB</button>
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-yellow dark:text-v3-chart-dark-text-yellow " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_referPrice">
                        25.55
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-purple dark:text-v3-chart-dark-text-purple " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_ceiling">
                        27.30
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-blue dark:text-v3-chart-dark-text-blue " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_floor">
                        23.80
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-text-light-default dark:text-v3-text-dark-default " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="overview_dayVolume"
                        id="cell-value-0_overview_dayVolume">
                        10,697,10
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-text-light-default dark:text-v3-text-dark-default hidden " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="overview_dayValue"
                        id="cell-value-0_overview_dayValue">
                        273,255
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_bids_2_price"
                        id="cell-value-0_orderbook_bids_2_price">
                        25.35
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_bids_2_volume"
                        id="cell-value-0_orderbook_bids_2_volume">
                        248,50
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_bids_1_price"
                        id="cell-value-0_orderbook_bids_1_price">
                        25.40
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_bids_1_volume"
                        id="cell-value-0_orderbook_bids_1_volume">
                        367,10
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_bids_0_price"
                        id="cell-value-0_orderbook_bids_0_price">
                        25.45
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_bids_0_volume"
                        id="cell-value-0_orderbook_bids_0_volume">
                        281,80
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_price">
                        25.45
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_volume">
                        1,00
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        data-col="overview_dayChange"
                        id="cell-value-0_overview_dayChange">
                        -0.10
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] hidden " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        data-col="overview_dayChangePercent"
                        id="cell-value-0_overview_dayChangePercent">
                        -0.4%
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_asks_0_price"
                        id="cell-value-0_orderbook_asks_0_price">
                        25.50
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_asks_0_volume"
                        id="cell-value-0_orderbook_asks_0_volume">
                        403,00
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-yellow dark:text-v3-chart-dark-text-yellow " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_asks_1_price"
                        id="cell-value-0_orderbook_asks_1_price">
                        25.55
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-yellow dark:text-v3-chart-dark-text-yellow " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_asks_1_volume"
                        id="cell-value-0_orderbook_asks_1_volume">
                        342,70
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-green dark:text-[#0BDF39] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_asks_2_price"
                        id="cell-value-0_orderbook_asks_2_price">
                        25.60
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-green dark:text-[#0BDF39] " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        data-col="orderbook_asks_2_volume"
                        id="cell-value-0_orderbook_asks_2_volume">
                        457,70
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-green dark:text-[#0BDF39] " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_highPrice">
                        25.70
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_avgPrice">
                        25.55
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#FF3737] " + (i % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#306BF20D] " : " dark:bg-[#78788061] bg-[#306BF21A] ")}
                        id="cell-value-0_overview_lowPrice">
                        25.45
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        id="cell-value-0_room_buyVol">
                        4,681,30
                    </td>
                    <td
                        className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253a] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right " + (i % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                        id="cell-value-0_room_sellVol">
                        4,668,70
                    </td>
                </tr>
            ))}
        </tbody>
    )
    // return (<tbody>
    //     {Array.from({ length: 40 }, (_, i) => (
    //         <tr key={i} className="group" data-scroll-page="0" id={i + "_ACB"}>
    //             {/* Mã chứng khoán */}
    //             <td
    //                 className={"scroll-mt-[52px] border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-caption text-[13px] font-bold group-hover:!bg-[#e0ecff] dark:group-hover:!bg-[#17253b] sticky left-0 z-[1] bg-[#dfdfdf]text-v3-chart-light-text-red dark:text-[#F93E3E] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-state="closed">
    //                 <button className="w-full h-full px-2 text-left">ACB</button>
    //             </td>
    //             {/* Trần sàn TC */}
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-yellow dark:text-v3-chart-dark-text-yellow bg-v3-primary-light-default/10 " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 dark:bg-[#7878802E] " : " dark:bg-[#78788061] ")}
    //                 id="cell-value-0_overview_referPrice">
    //                 25.55
    //             </td>
    //             <td
    //                 className={"xl:pr-2 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-purple dark:text-v3-chart-dark-text-purple bg-v3-primary-light-default/10 " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 dark:bg-[#7878802E] " : " dark:bg-[#78788061] ")}
    //                 id="cell-value-0_overview_ceiling">
    //                 27.30
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-blue dark:text-v3-chart-dark-text-blue bg-v3-primary-light-default/10 " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 dark:bg-[#7878802E] " : " dark:bg-[#78788061] ")}
    //                 id="cell-value-0_overview_floor">
    //                 23.80
    //             </td>
    //             {/* Khối lượng/giá trị khớp */}
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-text-light-default dark:text-v3-text-dark-default bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="overview_dayVolume"
    //                 id="cell-value-0_overview_dayVolume">
    //                 10,697,10
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-text-light-default dark:text-v3-text-dark-default bg-[#dfdfdf] hidden  " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="overview_dayValue"
    //                 id="cell-value-0_overview_dayValue">
    //                 273,255
    //             </td>
    //             {/* Mua */}
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_bids_2_price"
    //                 id="cell-value-0_orderbook_bids_2_price">
    //                 25.35
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_bids_2_volume"
    //                 id="cell-value-0_orderbook_bids_2_volume">
    //                 248,50
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_bids_1_price"
    //                 id="cell-value-0_orderbook_bids_1_price">
    //                 25.40
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_bids_1_volume"
    //                 id="cell-value-0_orderbook_bids_1_volume">
    //                 367,10
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_bids_0_price"
    //                 id="cell-value-0_orderbook_bids_0_price">
    //                 25.45
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_bids_0_volume"
    //                 id="cell-value-0_orderbook_bids_0_volume">
    //                 281,80
    //             </td>
    //             {/* Khớp lệnh */}
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-v3-primary-light-default/10 bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 id="cell-value-0_overview_price">
    //                 25.45
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-v3-primary-light-default/10 bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 id="cell-value-0_overview_volume">
    //                 1,00
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-v3-primary-light-default/10 bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="overview_dayChange"
    //                 id="cell-value-0_overview_dayChange">
    //                 -0.10
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-v3-primary-light-default/10 bg-[#dfdfdf] hidden  " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="overview_dayChangePercent"
    //                 id="cell-value-0_overview_dayChangePercent">
    //                 -0.4%
    //             </td>
    //             {/* Bán */}
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_asks_0_price"
    //                 id="cell-value-0_orderbook_asks_0_price">
    //                 25.50
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_asks_0_volume"
    //                 id="cell-value-0_orderbook_asks_0_volume">
    //                 403,00
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-yellow dark:text-v3-chart-dark-text-yellow bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_asks_1_price"
    //                 id="cell-value-0_orderbook_asks_1_price">
    //                 25.55
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-yellow dark:text-v3-chart-dark-text-yellow bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_asks_1_volume"
    //                 id="cell-value-0_orderbook_asks_1_volume">
    //                 342,70
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-green dark:text-[#1AB60B] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_asks_2_price"
    //                 id="cell-value-0_orderbook_asks_2_price">
    //                 25.60
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-green dark:text-[#1AB60B] bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 data-col="orderbook_asks_2_volume"
    //                 id="cell-value-0_orderbook_asks_2_volume">
    //                 457,70
    //             </td>
    //             {/* Giá cao/thấp/trung bình */}
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-green dark:text-[#1AB60B] bg-v3-primary-light-default/10 dark:bg-[#78788061] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " ")}
    //                 id="cell-value-0_overview_highPrice">
    //                 25.70
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-v3-primary-light-default/10 dark:bg-[#78788061] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " ")}
    //                 id="cell-value-0_overview_avgPrice">
    //                 25.55
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right text-v3-chart-light-text-red dark:text-[#F93E3E] bg-v3-primary-light-default/10 dark:bg-[#78788061] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " ")}
    //                 id="cell-value-0_overview_lowPrice">
    //                 25.45
    //             </td>
    //             {/* Nước ngoài */}
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right bg-[#dfdfdf]" + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 id="cell-value-0_room_buyVol">
    //                 4,681,30
    //             </td>
    //             <td
    //                 className={"xl:pr-1 py-1 group-hover:bg-[#e0ecff] dark:group-hover:bg-[#17253b] relative text-caption first:border-t-0 border-r first:border-l border-v3-line-light-1 dark:border-v3-line-dark-1 text-right bg-[#dfdfdf] " + (i % 2 !== 0 ? "bg-v3-bg-light-3 dark:bg-v3-bg-dark-3 " : " dark:bg-[#262628] ")}
    //                 id="cell-value-0_room_sellVol">
    //                 4,668,70
    //             </td>
    //         </tr>
    //     ))}
    // </tbody>
    // )
}

export default BodyTablePriceboard;
