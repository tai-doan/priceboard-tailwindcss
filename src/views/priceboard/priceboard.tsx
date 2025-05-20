import { SettingOutlined } from "@ant-design/icons";
import { toggleTheme } from "../../utils/themeToggle";
import MenuPriceboard from "./menu-priceboard";
import PriceboardFooter from "./priceboard-footer";
import TablePriceboard from "./table-priceboard";

const Priceboard = () => {

    return (<>
        <div id="priceboard-layout" className="h-full space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 px-4">
                    <div className="inline-flex items-center justify-center rounded-lg bg-light-frame dark:bg-dark-input p-0.5"><button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset bg-button-light-default dark:bg-button-dark-default text-white dark:text-white hover:text-white dark:hover:text-white">Bảng giá</button><button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset text-light-subtext-2 dark:text-dark-subtext-2">Cơ bản</button></div>
                    <MenuPriceboard />
                </div>
                <button className="flex items-center justify-center mr-3 border rounded-lg group w-7 h-7 border-v3-text-light-subtext-2 dark:border-v3-text-dark-subtext-2 hover:border-light-primary-hover dark:hover:border-dark-primary-hover">
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