
import type { VirtualItem } from '@tanstack/react-virtual';
import React from 'react';
import type { StockData } from '../../../interface/stock';
import PriceboardCell from './PriceboardCell';

const PriceboardRow = React.memo(({ row, virtualRow, index, baseClass, getColor }: {
    row: StockData,
    virtualRow: VirtualItem,
    index: number,
    baseClass: string,
    getColor: Function,
}) => {
    return (
        <tr
            key={row.t55}
            className="group"
            style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
            }}
        >
            {/* Mã CK */}
            <PriceboardCell
                type='normal'
                value={row.t55}
                id={"cell-value-" + row.t55 + "_" + index + "_code"}
                className={getColor(row.t20013, row.t270) + "scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737] " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                cellRender={
                    <button className="w-full h-full px-2 text-left overflow-ellipsis overflow-hidden cursor-pointer " title={row.t55}>{row.t55}</button>
                }
            />
            {/* Trần sàn tc */}
            <PriceboardCell
                value={row.t1149}
                id={"cell-value-" + row.t55 + "_" + index + "_ceiling"}
                className={baseClass + " text-light-price-ceil dark:text-dark-price-ceil " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
            />
            <PriceboardCell
                value={row.t1148}
                id={"cell-value-" + row.t55 + "_" + index + "_floor"}
                className={baseClass + " text-light-price-floor dark:text-dark-price-floor " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
            />
            <PriceboardCell
                value={row.t20013}
                id={"cell-value-" + row.t55 + "_" + index + "_referPrice"}
                className={baseClass + " text-light-price-ref dark:text-dark-price-ref " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
            />
            {/* KL/GT giao dịch */}
            <PriceboardCell
                type='normal'
                value={row.t387}
                id={"cell-value-" + row.t55 + "_" + index + "_dayVolume"}
                className={baseClass + " text-light-default dark:text-dark-default " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
            />
            <PriceboardCell
                type='normal'
                value={row.t381}
                id={"cell-value-" + row.t55 + "_" + index + "_dayValue"}
                className={baseClass + " text-light-default dark:text-dark-default hidden " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
            />
            {/* Bên mua */}
            <PriceboardCell
                value={row?.TPBID?.[0]?.t270}
                className={baseClass + getColor(row.t20013, row?.TPBID?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_bids_0_price"}
            />
            <PriceboardCell
                value={row?.TPBID?.[0]?.t271}
                className={baseClass + getColor(row.t20013, row?.TPBID?.[0]?.t271) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_bids_0_volume"}
            />
            <PriceboardCell
                value={row?.TPBID?.[1]?.t270}
                className={baseClass + getColor(row.t20013, row?.TPBID?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_bids_1_price"}
            />
            <PriceboardCell
                value={row?.TPBID?.[1]?.t271}
                className={baseClass + getColor(row.t20013, row?.TPBID?.[1]?.t271) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_bids_1_volume"}
            />
            <PriceboardCell
                value={row?.TPBID?.[2]?.t270}
                className={baseClass + getColor(row.t20013, row?.TPBID?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_bids_2_price"}
            />
            <PriceboardCell
                value={row?.TPBID?.[2]?.t271}
                className={baseClass + getColor(row.t20013, row?.TPBID?.[2]?.t271) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_bids_2_volume"}
            />
            {/* Khớp */}
            <PriceboardCell
                className={baseClass + getColor(row.t20013, row.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_price"}
                value={row.t270}
            />
            <PriceboardCell
                className={baseClass + getColor(row.t20013, row.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_volume"}
                value={row.t271}
            />
            <PriceboardCell
                className={baseClass + getColor(row.t20013, row.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_dayChange"}
                value={row.t270 - row.t20013}
            />
            <PriceboardCell
                className={baseClass + " dark:text-[#FF3737] hidden " + getColor(row.t20013, row.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_dayChangePercent"}
                value={(row.t270 - row.t20013) / row.t20013 * 100}
            />
            {/* Bên bán */}
            <PriceboardCell
                value={row?.TPOFFER?.[0]?.t270}
                className={baseClass + getColor(row.t20013, row?.TPOFFER?.[0]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_0_price"}
            />
            <PriceboardCell
                value={row?.TPOFFER?.[0]?.t271}
                className={baseClass + getColor(row.t20013, row?.TPOFFER?.[0]?.t271) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_0_volume"}
            />
            <PriceboardCell
                value={row?.TPOFFER?.[1]?.t270}
                className={baseClass + getColor(row.t20013, row?.TPOFFER?.[1]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_1_price"}
            />
            <PriceboardCell
                value={row?.TPOFFER?.[1]?.t271}
                className={baseClass + getColor(row.t20013, row?.TPOFFER?.[1]?.t271) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_1_volume"}
            />
            <PriceboardCell
                value={row?.TPOFFER?.[2]?.t270}
                className={baseClass + getColor(row.t20013, row?.TPOFFER?.[2]?.t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_2_price"}
            />
            <PriceboardCell
                value={row?.TPOFFER?.[2]?.t271}
                className={baseClass + getColor(row.t20013, row?.TPOFFER?.[2]?.t271) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_2_volume"}
            />
            {/* Cao thấp trung bình */}
            <PriceboardCell
                value={row?.t30562}
                className={baseClass + getColor(row.t20013, row.t30562) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_highPrice"}
            />
            <PriceboardCell
                value={row?.t40001}
                className={baseClass + getColor(row.t20013, row.t40001) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_avgPrice"}
            />
            <PriceboardCell
                value={row?.t30563}
                className={baseClass + getColor(row.t20013, row.t30563) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_lowPrice"}
            />
            {/* RoomNN */}
            <PriceboardCell
                type='normal'
                value={row.FRG?.t30645}
                className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_room_buyVol"}
            />
            <PriceboardCell
                type='normal'
                value={row.FRG?.t30643}
                className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + row.t55 + "_" + index + "_room_sellVol"}
            />
        </tr>
    );
});

export default PriceboardRow;