import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { memo } from "react";

const HeaderTablePriceboard = () => {
    return (
        <thead className="sticky top-0 z-10 backdrop-filter backdrop-blur-sm">
            <tr>
                <th
                    className="text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323] sticky left-0 z-10 border-b"
                    id="thead_stock_code"
                    colSpan={1}
                    rowSpan={0}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Mã CK
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b "
                    id="thead_ceil"
                    colSpan={1}
                    rowSpan={0}
                    style={{
                        minWidth: "40px",
                        width: "40px",
                    }}>
                    Trần
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b "
                    id="thead_floor"
                    colSpan={1}
                    rowSpan={0}
                    style={{
                        minWidth: "40px",
                        width: "40px",
                    }}>
                    Sàn
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b "
                    id="thead_ref"
                    colSpan={1}
                    rowSpan={0}
                    style={{
                        minWidth: "40px",
                        width: "40px",
                    }}>
                    TC
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b "
                    colSpan={1}
                    id="thead_total_volume"
                    rowSpan={0}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    <CaretLeftOutlined sizes="small" className="absolute top-0 left-0 cursor-pointer h-full px-1 hover:bg-[#fffbf585] dark:hover:bg-[#242323] " />
                    <CaretRightOutlined sizes="small" className="absolute top-0 right-0 cursor-pointer h-full px-1 hover:bg-[#fffbf585] dark:hover:bg-[#242323] " />
                    Tổng KL
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]  border-b  hidden "
                    colSpan={1}
                    id="thead_overview_dayValue"
                    rowSpan={0}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    <button className="absolute top-0 left-0 h-full px-1 hover:bg-[#fffbf585] bg-[#FFFFFF] ">
                        <svg
                            fill="none"
                            height="8"
                            viewBox="0 0 8 8"
                            width="8"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M6 5.56858C6 6.4619 4.91786 6.90696 4.28936 6.27213L2.70359 4.67039C2.31501 4.2779 2.3182 3.64472 2.71071 3.25616L4.29648 1.68636C4.92789 1.06131 6 1.50857 6 2.39704V5.56858Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button className="absolute top-0 right-0 h-full px-1 hover:bg-[#fffbf585] bg-[#FFFFFF] ">
                        <svg
                            fill="none"
                            height="8"
                            viewBox="0 0 8 8"
                            width="8"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M2 5.56858C2 6.4619 3.08214 6.90696 3.71064 6.27213L5.29641 4.67039C5.68499 4.2779 5.6818 3.64472 5.28929 3.25616L3.70352 1.68636C3.07211 1.06131 2 1.50857 2 2.39704L2 5.56858Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                    Tổng GT
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium "
                    colSpan={6}
                    rowSpan={1}
                    style={{
                        minWidth: "300px",
                        width: "300px",
                    }}>
                    Bên mua
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium     "
                    colSpan={3}
                    id="thead_match"
                    rowSpan={1}
                    style={{
                        minWidth: "120px",
                        width: "120px",
                    }}>
                    Khớp lệnh
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium "
                    colSpan={6}
                    rowSpan={1}
                    style={{
                        minWidth: "300px",
                        width: "300px",
                    }}>
                    Bên bán
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium     "
                    colSpan={3}
                    rowSpan={1}
                    style={{
                        minWidth: "120px",
                        width: "120px",
                    }}>
                    Giá
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium "
                    colSpan={2}
                    rowSpan={1}
                    style={{
                        minWidth: "120px",
                        width: "120px",
                    }}>
                    <CaretLeftOutlined sizes="small" className="absolute top-0 left-0 cursor-pointer h-full px-1 hover:bg-[#fffbf585]" />
                    <CaretRightOutlined sizes="small" className="absolute top-0 right-0 cursor-pointer h-full px-1 hover:bg-[#fffbf585]" />
                    Nước ngoài
                </th>
            </tr>
            <tr>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_bids_2_price"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Giá 3
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_bids_2_volume"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    KL 3
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_bids_1_price"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Giá 2
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_bids_1_volume"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    KL 2
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_bids_0_price"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Giá 1
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_bids_0_volume"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    KL 1
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id="thead_match_price"
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Giá
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id="thead_match_volume"
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    KL
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id="thead_match_change"
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    <CaretLeftOutlined sizes="small" className="absolute top-0 left-0 cursor-pointer h-full px-1 hover:bg-[#fffbf585] dark:hover:bg-[#242323] " />
                    <CaretRightOutlined sizes="small" className="absolute top-0 right-0 cursor-pointer h-full px-1 hover:bg-[#fffbf585] dark:hover:bg-[#242323] " />
                    +/-
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b dark:bg-[#161616] hidden bg-[#FFFFFF] "
                    colSpan={1}
                    id="thead_overview_dayChangePercent"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    <button className="absolute top-0 left-0 h-full px-1 hover:bg-[#fffbf585] bg-[#FFFFFF] ">
                        <svg
                            fill="none"
                            height="8"
                            viewBox="0 0 8 8"
                            width="8"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M6 5.56858C6 6.4619 4.91786 6.90696 4.28936 6.27213L2.70359 4.67039C2.31501 4.2779 2.3182 3.64472 2.71071 3.25616L4.29648 1.68636C4.92789 1.06131 6 1.50857 6 2.39704V5.56858Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button className="absolute top-0 right-0 h-full px-1 hover:bg-[#fffbf585] bg-[#FFFFFF] ">
                        <svg
                            fill="none"
                            height="8"
                            viewBox="0 0 8 8"
                            width="8"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                clipRule="evenodd"
                                d="M2 5.56858C2 6.4619 3.08214 6.90696 3.71064 6.27213L5.29641 4.67039C5.68499 4.2779 5.6818 3.64472 5.28929 3.25616L3.70352 1.68636C3.07211 1.06131 2 1.50857 2 2.39704L2 5.56858Z"
                                fill="currentColor"
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                    %
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_asks_0_price"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Giá 1
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_asks_0_volume"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    KL 1
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_asks_1_price"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Giá 2
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_asks_1_volume"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    KL 2
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_asks_2_price"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Giá 3
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    colSpan={1}
                    id="thead_orderbook_asks_2_volume"
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    KL 3
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id='thead_highest'
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Cao
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id='thead_avg'
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    TB
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id='thead_lowest'
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Thấp
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id="thead_FR_volume_buy"
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}>
                    Mua
                </th>
                <th
                    className="relative text-center text-caption border-t border-r border-light-line dark:border-dark-line py-1.5 font-medium cursor-pointer select-none hover:bg-[#fffbf585] dark:hover:bg-[#242323]   border-b "
                    id="thead_FR_volume_sell"
                    colSpan={1}
                    rowSpan={1}
                    style={{
                        minWidth: "60px",
                        width: "60px",
                    }}
                >
                    Bán
                </th>
            </tr>
        </thead>
    )
}

export default memo(HeaderTablePriceboard);
