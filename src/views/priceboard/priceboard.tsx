import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import useSafeState from "../../hooks/useSafeState";
import { toggleTheme } from "../../utils/themeToggle";
import MenuPriceboard from "./menu-priceboard";
import PriceboardFooter from "./priceboard-footer";
import TablePriceboard from "./table-priceboard";
import { useState } from "react";

const Priceboard = () => {
    const [stockCd, setStockCd] = useState('');
    const [indexCd, setIndexCd] = useState('');

    const handleChangeIndex = (indexCode: string) => {
        console.log("!PRICEBOARD handleChangeIndex: ", indexCode, indexCd);

        setIndexCd(indexCode);
    }

    return (<>
        <div id="priceboard-layout" className="h-full space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 px-4">
                    <div className="flex items-center justify-end flex-1 gap-4">
                        <div className="text-[10px] !h-[26px]">
                            <div className="rounded-md flex justify-center items-center px-2 bg-light-input dark:bg-dark-input border-[1px] border-neutral-12 dark:border-black text-neutral-1 dark:text-text-1 focus:border-primary-1 max-w-[130px] h-full !text-[12px] float-right">
                                <span className="ant-input-prefix">
                                    <SearchOutlined className="text-neutral-3 dark:text-text-3" />
                                </span>
                                <input
                                    name="stockCode"
                                    type="text"
                                    placeholder="Mã CK"
                                    className="ml-1 max-w-[90px] focus:outline-none font-bold"
                                    value={stockCd}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        if (e.target.value.length > 10) return
                                        setStockCd(e.target.value.toLocaleUpperCase());
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inline-flex items-center justify-center rounded-lg bg-light-frame dark:bg-dark-input p-0.5">
                        <button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-8 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset bg-button-light-default dark:bg-button-dark-default text-white dark:text-white hover:text-white dark:hover:text-white">
                            Bảng giá
                        </button>
                        {/* <button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset text-light-subtext-2 dark:text-dark-subtext-2">
                            Cơ bản
                        </button> */}
                        </div>
                    <MenuPriceboard changeIndexCallback={handleChangeIndex} />
                </div>
                <button className="flex items-center justify-center mr-3 border rounded-lg group w-7 h-7 border-v3-text-light-subtext-2 dark:border-v3-text-dark-subtext-2 hover:border-light-primary-hover dark:hover:border-dark-primary-hover">
                    <SettingOutlined onClick={() => {
                        toggleTheme();
                    }} />
                </button>
            </div>
            <TablePriceboard indexCd={indexCd} />
            <PriceboardFooter />
        </div>
    </>
    )
};

export default Priceboard;