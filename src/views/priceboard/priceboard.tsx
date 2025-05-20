import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { useEffect, useRef, useState } from "react";
import usePriceboardSocket from "../../hooks/usePriceboardSocket";
import { toggleTheme } from "../../utils/themeToggle";
import PriceboardFooter from "./priceboard-footer";
import TablePriceboard from "./table-priceboard";

const baseMenuClass = "px-4 relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset";

const Priceboard = () => {
    const { indexList } = usePriceboardSocket();
    const [hoseMenu, setHoseMenu] = useState<MenuProps['items']>([]);
    const [hnxMenu, setHnxMenu] = useState<MenuProps['items']>([]);
    const [upcomMenu, setUpcomMenu] = useState<MenuProps['items']>([]);
    const indexCdRef = useRef('STO|101');
    const [menuSelected, setMenuSelected] = useState({
        key: indexCdRef.current,
        label: 'VN30',
    });

    useEffect(() => {
        const hose = indexList.filter(x => x.indexCode === 'STO' && !!x.nameEN?.length).map(item => ({
            label: item.nameVI,
            key: item.indexCode + "|" + item.code,
            style: { padding: 8, lineHeight: 1, }
        }))
        const hnx = indexList.filter(x => x.indexCode === 'STX' && !!x.nameEN?.length).map(item => ({
            label: item.nameVI,
            key: item.indexCode + "|" + item.code,
            style: { padding: 8, lineHeight: 1, }
        }))
        const upc = indexList.filter(x => x.indexCode === 'UPX' && !!x.nameEN?.length).map(item => ({
            label: item.nameVI,
            key: item.indexCode + "|" + item.code,
            style: { padding: 8, lineHeight: 1, }
        }))
        setHoseMenu(hose);
        setHnxMenu(hnx);
        setUpcomMenu(upc);

        return () => {

        }
    }, [indexList])

    return (<>
        <div id="priceboard-layout" className="h-full space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 px-4">
                    <div className="inline-flex items-center justify-center rounded-lg bg-light-frame dark:bg-dark-input p-0.5"><button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset bg-button-light-default dark:bg-button-dark-default text-white dark:text-white hover:text-white dark:hover:text-white">Bảng giá</button><button type="button" className="relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset text-light-subtext-2 dark:text-dark-subtext-2">Cơ bản</button></div>
                    <div className="inline-flex items-center justify-center rounded-lg bg-light-frame dark:bg-dark-input p-0.5">
                        <Dropdown
                            menu={{
                                items: hoseMenu,
                                style: {
                                    maxHeight: '50vh',
                                    overflow: 'auto',
                                },
                                onClick: (item) => {
                                    console.log("onclick ", item);
                                    // @ts-ignore
                                    setMenuSelected(hoseMenu?.find(x => x?.key === item.key))
                                }
                            }}
                        >
                            <button
                                type="button"
                                className={`${baseMenuClass} ${menuSelected.key.includes("STO")
                                    ? "bg-button-light-default dark:bg-button-dark-default text-white dark:text-white hover:text-white dark:hover:text-white"
                                    : "text-light-subtext-2 dark:text-dark-subtext-2"}`
                                }
                            >
                                {menuSelected.key.includes("STO") ? menuSelected.label : "HOSE"}
                            </button>
                        </Dropdown>
                        <Dropdown
                            menu={{
                                items: hnxMenu,
                                style: {
                                    maxHeight: '50vh',
                                    overflow: 'auto',
                                },
                                onClick: (item) => {
                                    console.log("onclick ", item);
                                    // @ts-ignore
                                    setMenuSelected(hnxMenu?.find(x => x?.key === item.key))
                                }
                            }}
                        >
                            <button
                                type="button"
                                className={`${baseMenuClass} ${menuSelected.key.includes("STX")
                                    ? "bg-button-light-default dark:bg-button-dark-default text-white dark:text-white hover:text-white dark:hover:text-white"
                                    : "text-light-subtext-2 dark:text-dark-subtext-2"}`
                                }
                            >
                                {menuSelected.key.includes("STX") ? menuSelected.label : "HNX"}
                            </button>
                        </Dropdown>
                        <Dropdown
                            menu={{
                                items: upcomMenu,
                                style: {
                                    maxHeight: '50vh',
                                    overflow: 'auto',
                                },
                                onClick: (item) => {
                                    console.log("onclick ", item);
                                    // @ts-ignore
                                    setMenuSelected(upcomMenu?.find(x => x?.key === item.key))
                                }
                            }}
                        >
                            <button
                                type="button"
                                className={`${baseMenuClass} ${menuSelected.key.includes("UPX")
                                    ? "bg-button-light-default dark:bg-button-dark-default text-white dark:text-white hover:text-white dark:hover:text-white"
                                    : "text-light-subtext-2 dark:text-dark-subtext-2"}`
                                }
                            >
                                {menuSelected.key.includes("UPX") ? menuSelected.label : "UPCOM"}
                            </button>
                        </Dropdown>
                    </div>
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