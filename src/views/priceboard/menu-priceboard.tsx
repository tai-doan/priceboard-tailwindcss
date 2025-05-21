import { DownOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { useEffect, useRef, useState } from "react";
import usePriceboardSocket from "../../hooks/usePriceboardSocket";


const baseMenuClass = "group px-4 relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset";

const MenuPriceboard = () => {
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

  return (
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
          &nbsp;{<DownOutlined className="group-hover:rotate-180 transition-all" />}
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
          &nbsp;{<DownOutlined className="group-hover:rotate-180 transition-all" />}
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
          &nbsp;{<DownOutlined className="group-hover:rotate-180 transition-all" />}
        </button>
      </Dropdown>
    </div>
  )
}

export default MenuPriceboard;
