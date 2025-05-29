
import { DeleteOutlined, PushpinOutlined } from '@ant-design/icons';
import type { Row } from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';
import { memo } from 'react';
import { useStock } from '../../../hooks/useStock';
import type { StockData } from '../../../interface/stock';
import PriceboardCell from './PriceboardCell';

const PriceboardRow = ({ rowKey, row, virtualRow, index, baseClass, getColor, isShowPin = true }: {
    rowKey: string,
    row: Row<StockData>,
    index: number,
    baseClass: string,
    getColor: Function,
    isShowPin?: boolean,
    virtualRow?: VirtualItem,
}) => {
    // Lắng nghe dữ liệu của mã chứng khoán thay đổi
    const rowData = useStock(rowKey);
    return (
        <tr
            key={rowData.t55}
            data-group={index + "_" + rowData.t55}
            className={isShowPin ? (index % 2 !== 0 ? " group dark:bg-[#060606] bg-[#fff] " : " group dark:bg-[#262628] bg-[#F3F5F6] ") : "group"}
            style={
                !isShowPin
                    ? {
                        height: `${virtualRow?.size}px`,
                        transform: !!virtualRow ? `translateY(${virtualRow?.start - index * virtualRow?.size}px)` : 'unset',
                    }
                    : row.getIsPinned()
                        ? {
                            position: 'sticky',
                            zIndex: 9,
                            top: `${(row.getPinnedIndex() * 26) + 63}px`, // Số lượng * Chiều cao từng dòng + chiều cao header
                        } : {}
            }
        >
            {/* Mã CK */}
            <PriceboardCell
                type='normal'
                value={rowData.t55}
                id={"cell-value-" + rowData.t55 + "_" + index + "_code"}
                className={"scroll-mt-[52px] border-r first:border-l border-light-line dark:border-dark-line text-caption text-[13px] font-bold group-hover:!bg-[#33343C3D] dark:group-hover:!bg-[#33343C] sticky left-0 z-[1] dark:text-[#FF3737] " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                cellRender={
                    !isShowPin
                        ? <button className="w-full h-full px-2 text-left overflow-ellipsis overflow-hidden cursor-pointer " title={rowData.t55}>{rowData.t55}</button>
                        : <div className="w-full h-full px-2 overflow-ellipsis flex flex-column justify-between overflow-hidden cursor-pointer" title={rowData.t55}>
                            <button className={getColor(rowData.t20013, rowData.t270) + " text-left"}>{rowData.t55}</button>
                            {row.getIsPinned()
                                ? <DeleteOutlined
                                    title='Click để gỡ mã CK ra khỏi đầu danh mục'
                                    className='flex'
                                    style={{ color: "#F08200" }}
                                    onClick={() => row.pin(false)}
                                />
                                : <PushpinOutlined
                                    title='Click để pin mã CK lên đầu danh mục'
                                    className='flex'
                                    style={{ color: "#F08200" }}
                                    onClick={() => row.pin('top')}
                                />
                            }
                        </div>
                }
            />
            {/* Trần sàn tc */}
            <PriceboardCell
                value={rowData.t1149}
                id={"cell-value-" + rowData.t55 + "_" + index + "_ceiling"}
                className={baseClass + " text-light-price-ceil dark:text-dark-price-ceil " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#F3F5F6] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
            />
            <PriceboardCell
                value={rowData.t1148}
                id={"cell-value-" + rowData.t55 + "_" + index + "_floor"}
                className={baseClass + " text-light-price-floor dark:text-dark-price-floor " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#F3F5F6] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
            />
            <PriceboardCell
                value={rowData.t20013}
                id={"cell-value-" + rowData.t55 + "_" + index + "_referPrice"}
                className={baseClass + " text-light-price-ref dark:text-dark-price-ref " + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#F3F5F6] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
            />
            {/* KL/GT giao dịch */}
            <PriceboardCell
                type='normal'
                flashType='neutral'
                value={rowData.t387}
                id={"cell-value-" + rowData.t55 + "_" + index + "_dayVolume"}
                className={baseClass + " text-light-default dark:text-dark-default " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
            />
            <PriceboardCell
                type='normal'
                flashType='neutral'
                value={rowData.t381}
                id={"cell-value-" + rowData.t55 + "_" + index + "_dayValue"}
                className={baseClass + " text-light-default dark:text-dark-default hidden " + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
            />
            {/* Bên mua */}
            <PriceboardCell
                type='bid'
                value={rowData?.TPBID_0_t270}
                className={baseClass + getColor(rowData.t20013, rowData?.TPBID_0_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_bids_0_price"}
            />
            <PriceboardCell
                type='bid'
                value={rowData?.TPBID_0_t271}
                className={baseClass + getColor(rowData.t20013, rowData?.TPBID_0_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_bids_0_volume"}
            />
            <PriceboardCell
                type='bid'
                value={rowData?.TPBID_1_t270}
                className={baseClass + getColor(rowData.t20013, rowData?.TPBID_1_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_bids_1_price"}
            />
            <PriceboardCell
                type='bid'
                value={rowData?.TPBID_1_t271}
                className={baseClass + getColor(rowData.t20013, rowData?.TPBID_1_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_bids_1_volume"}
            />
            <PriceboardCell
                type='bid'
                value={rowData?.TPBID_2_t270}
                className={baseClass + getColor(rowData.t20013, rowData?.TPBID_2_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_bids_2_price"}
            />
            <PriceboardCell
                type='bid'
                value={rowData?.TPBID_2_t271}
                className={baseClass + getColor(rowData.t20013, rowData?.TPBID_2_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_bids_2_volume"}
            />
            {/* Khớp */}
            <PriceboardCell
                className={baseClass + getColor(rowData.t20013, rowData.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_price"}
                value={rowData.t270}
            />
            <PriceboardCell
                className={baseClass + getColor(rowData.t20013, rowData.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_volume"}
                value={rowData.t271}
            />
            <PriceboardCell
                className={baseClass + getColor(rowData.t20013, rowData.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_dayChange"}
                value={rowData.t270 - rowData.t20013}
            />
            <PriceboardCell
                className={baseClass + " dark:text-[#FF3737] hidden " + getColor(rowData.t20013, rowData.t270) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#FFFFFF] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_dayChangePercent"}
                value={(rowData.t270 - rowData.t20013) / rowData.t20013 * 100}
            />
            {/* Bên bán */}
            <PriceboardCell
                type='ask'
                value={rowData?.TPOFFER_0_t270}
                className={baseClass + getColor(rowData.t20013, rowData?.TPOFFER_0_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_0_price"}
            />
            <PriceboardCell
                type='ask'
                value={rowData?.TPOFFER_0_t271}
                className={baseClass + getColor(rowData.t20013, rowData?.TPOFFER_0_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_0_volume"}
            />
            <PriceboardCell
                type='ask'
                value={rowData?.TPOFFER_1_t270}
                className={baseClass + getColor(rowData.t20013, rowData?.TPOFFER_1_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_1_price"}
            />
            <PriceboardCell
                type='ask'
                value={rowData?.TPOFFER_1_t271}
                className={baseClass + getColor(rowData.t20013, rowData?.TPOFFER_1_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_1_volume"}
            />
            <PriceboardCell
                type='ask'
                value={rowData?.TPOFFER_2_t270}
                className={baseClass + getColor(rowData.t20013, rowData?.TPOFFER_2_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_2_price"}
            />
            <PriceboardCell
                type='ask'
                value={rowData?.TPOFFER_2_t271}
                className={baseClass + getColor(rowData.t20013, rowData?.TPOFFER_2_t270) + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_2_volume"}
            />
            {/* Cao thấp trung bình */}
            <PriceboardCell
                value={rowData?.t30562}
                className={baseClass + getColor(rowData.t20013, rowData.t30562) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#F3F5F6] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_highPrice"}
            />
            <PriceboardCell
                value={rowData?.t40001}
                className={baseClass + getColor(rowData.t20013, rowData.t40001) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#F3F5F6] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_avgPrice"}
            />
            <PriceboardCell
                value={rowData?.t30563}
                className={baseClass + getColor(rowData.t20013, rowData.t30563) + (index % 2 !== 0 ? " dark:bg-[#7878802E] bg-[#F3F5F6] " : " dark:bg-[#78788061] bg-[#eaeaea] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_lowPrice"}
            />
            {/* RoomNN */}
            <PriceboardCell
                type='normal'
                flashType='neutral'
                value={rowData.FRG?.t30645}
                className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_room_buyVol"}
            />
            <PriceboardCell
                type='normal'
                flashType='neutral'
                value={rowData.FRG?.t30643}
                className={baseClass + (index % 2 !== 0 ? " dark:bg-[#060606] bg-[#fff] " : " dark:bg-[#262628] bg-[#F3F5F6] ")}
                id={"cell-value-" + rowData.t55 + "_" + index + "_room_sellVol"}
            />
        </tr>
    );
};

export default memo(PriceboardRow, (prevProps, nextProps) => {
    // Mã CK
    return prevProps.index === nextProps.index &&
        prevProps.row.index === nextProps.row.index &&
        prevProps.rowKey === nextProps.rowKey
    // prevProps.rowData.t55 === nextProps.rowData.t55 &&
    // // Trần/Sàn/TC
    // prevProps.rowData.t1149 === nextProps.rowData.t1149 &&
    // prevProps.rowData.t1148 === nextProps.rowData.t1148 &&
    // prevProps.rowData.t20013 === nextProps.rowData.t20013 &&
    // // KLGD/GTGD
    // prevProps.rowData.t387 === nextProps.rowData.t387 &&
    // prevProps.rowData.t381 === nextProps.rowData.t381 &&
    // // Bên mua
    // prevProps.rowData.TPBID?.[0]?.t270 === nextProps.rowData.TPBID?.[0]?.t270 &&
    // prevProps.rowData.TPBID?.[0]?.t271 === nextProps.rowData.TPBID?.[0]?.t271 &&
    // prevProps.rowData.TPBID?.[1]?.t270 === nextProps.rowData.TPBID?.[1]?.t270 &&
    // prevProps.rowData.TPBID?.[1]?.t271 === nextProps.rowData.TPBID?.[1]?.t271 &&
    // prevProps.rowData.TPBID?.[2]?.t270 === nextProps.rowData.TPBID?.[2]?.t270 &&
    // prevProps.rowData.TPBID?.[2]?.t271 === nextProps.rowData.TPBID?.[2]?.t271 &&
    // // Khớp
    // prevProps.rowData.t270 === nextProps.rowData.t270 &&
    // prevProps.rowData.t271 === nextProps.rowData.t271 &&
    // // Bên bán
    // prevProps.rowData.TPOFFER?.[0]?.t270 === nextProps.rowData.TPOFFER?.[0]?.t270 &&
    // prevProps.rowData.TPOFFER?.[0]?.t271 === nextProps.rowData.TPOFFER?.[0]?.t271 &&
    // prevProps.rowData.TPOFFER?.[1]?.t270 === nextProps.rowData.TPOFFER?.[1]?.t270 &&
    // prevProps.rowData.TPOFFER?.[1]?.t271 === nextProps.rowData.TPOFFER?.[1]?.t271 &&
    // prevProps.rowData.TPOFFER?.[2]?.t270 === nextProps.rowData.TPOFFER?.[2]?.t270 &&
    // prevProps.rowData.TPOFFER?.[2]?.t271 === nextProps.rowData.TPOFFER?.[2]?.t271 &&
    // // Cao/Trung bình/Thấp
    // prevProps.rowData.t30562 === nextProps.rowData.t30562 &&
    // prevProps.rowData.t40001 === nextProps.rowData.t40001 &&
    // prevProps.rowData.t30563 === nextProps.rowData.t30563 &&
    // // NN mua/bán
    // prevProps.rowData.FRG?.t30645 === nextProps.rowData.FRG?.t30645 &&
    // prevProps.rowData.FRG?.t30643 == nextProps.rowData.FRG?.t30643
});