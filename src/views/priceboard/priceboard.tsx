import { SettingOutlined } from "@ant-design/icons";
import { toggleTheme } from "../../utils/themeToggle";
import PriceboardFooter from "./priceboard-footer";
import TablePriceboard from "./table-priceboard";

const Priceboard = () => {
    return (<>
        <div id="priceboard" className="h-full space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 px-4">
                    <div className="inline-flex items-center justify-center rounded-lg bg-v3-bg-light-frame dark:bg-v3-bg-dark-input p-0.5"><button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-offset-v3-primary-light-hover dark:ring-offset-v3-primary-dark-hover transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-v3-btn-light-default dark:bg-v3-btn-dark-default text-white dark:text-white hover:text-white dark:hover:text-white">Bảng giá</button><button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-offset-v3-primary-light-hover dark:ring-offset-v3-primary-dark-hover transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-v3-text-light-subtext-2 dark:text-v3-text-dark-subtext-2">Cơ bản</button></div>
                </div>
                <button className="flex items-center justify-center mr-3 border rounded-lg group w-7 h-7 border-v3-text-light-subtext-2 dark:border-v3-text-dark-subtext-2 hover:border-v3-primary-light-hover dark:hover:border-v3-primary-dark-hover">
                    <SettingOutlined onClick={() => {
                        toggleTheme();
                    }} />
                </button>
            </div>
            <TablePriceboard />
            <PriceboardFooter />
        </div>
    </>
    )
};

export default Priceboard;