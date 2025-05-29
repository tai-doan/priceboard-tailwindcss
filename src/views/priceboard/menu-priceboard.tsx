import { DownOutlined } from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import usePriceboardSocket from "../../hooks/usePriceboardSocket";
import { usePriceboardSocketStore } from "../../provider/priceboard-socket-store";

const baseMenuClass = "group px-4 relative group text-caption font-medium py-0.5 inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 ring-light-primary-offset-hover dark:ring-dark-primary-offset-hover transition-all focus-visible:outline-none focus-visible:ring focus-visible:ring-offset";

const MenuPriceboard = (
  {
    changeIndexCallback = () => { }
  }: {
    changeIndexCallback: (value: string) => void
  }
) => {
  const { indexList, marketData, subscribeFunctWithControl, } = usePriceboardSocketStore();
  const [hoseMenu, setHoseMenu] = useState<MenuProps['items']>([]);
  const [hnxMenu, setHnxMenu] = useState<MenuProps['items']>([]);
  const [upcomMenu, setUpcomMenu] = useState<MenuProps['items']>([]);
  const indexCdRef = useRef('');
  const [menuSelected, setMenuSelected] = useState({
    key: indexCdRef.current,
    label: '',
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

    setMenuSelected(hose.find(x => x.label === 'VN30') ?? {
      key: indexCdRef.current,
      label: '',
    });

    return () => {

    }
  }, [indexList])

  useEffect(() => {
    if (menuSelected.key) {
      handleChangeMenu(menuSelected.key);
    }
  }, [menuSelected.key])

  const handleChangeMenu = useCallback((path: string) => {
    changeIndexCallback(path);
    subscribeFunctWithControl?.({
      component: "PRICEBOARD",
      command: "SUB",
      topic: ["KRXMDDS|IGS|" + path],
      value: [""],
      onSuccess: () => {
        console.log("marketData trước khi gọi onSuccess: ", marketData);
        subscribeFunctWithControl({
          component: "PRICEBOARD",
          command: "UNSUB",
          topic: ["KRXMDDS|IGS|" + path],
          value: [""],
        })
      },
    })
  }, [subscribeFunctWithControl])

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
        overlayClassName="bg-light-frame dark:bg-dark-frame mac-scrollbar text-white"
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
        overlayClassName="bg-light-frame dark:bg-dark-frame"
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
        overlayClassName="bg-light-frame dark:bg-dark-frame"
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
