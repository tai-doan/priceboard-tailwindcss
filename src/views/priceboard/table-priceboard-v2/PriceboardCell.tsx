import React, { memo, useEffect } from "react";
import usePrevious from "../../../hooks/usePrevious";
import { getPriceFractionSizeFormat, getVolumeFractionSizeFormat, useAppStore } from "../../../provider/app-store";
import { changeBackground } from "../../../utils";
import FormatNumber from "../../../utils/formater/FormatNumber";

/**
 * @param value - Giá trị đầu vào
 * @param id - ID của cell
 * @param clasName - class của cell
 * @param type - 'price' | 'volume' | 'normal' | 'bid' | 'ask' - Loại giá trị render
 * @param flashType - 'ref' | 'neutral' - Loại giá trị để đổi màu cell
 * @param cellRender - Dùng để thay thế toàn bộ giá trị render của cell với các cell đặt biệt
 */
const PriceboardCell = React.memo((
  {
    value,
    id,
    className,
    type = 'price',
    cellRender,
    flashType = 'ref',
  }: {
    value: string | number,
    id: string,
    className: string,
    type?: 'price' | 'volume' | 'normal' | 'bid' | 'ask',
    cellRender?: any,
    flashType?: 'ref' | 'neutral',
  }
) => {
  const prevValue = usePrevious(value);
  const { volumeUnit } = useAppStore();

  useEffect(() => {
    if (id)
      if (prevValue && value && prevValue !== value && !!value) {
        changeBackground(id, value, prevValue, flashType)
      }
  }, [value]);

  if (type === 'price') {
    return (
      <td className={className} id={id}>
        {cellRender ?? FormatNumber({
          value: value,
          fractionSize: 2,
          empty: 0,
          key: 'short',
          translateFunc: () => '',
        })}
      </td>
    );
  }
  if (type === 'bid' || type === 'ask') {
    return (
      <td className={className} id={id}>
        {cellRender ?? FormatNumber({
          value: value,
          fractionSize: 2,
          empty: 1,
          key: 'short',
          translateFunc: () => '',
        })}
      </td>
    );
  }
  if (type === 'normal') {
    return (
      <td className={className} id={id}>
        {cellRender ?? FormatNumber({
          value: value,
          fractionSize: 2,
          empty: 0,
          key: 'short',
          translateFunc: () => '',
        })}
      </td>
      // <td className={className} id={id}>
      //   {cellRender ?? value}
      // </td>
    );
  }
  if (type === 'volume') {
    return (
      <td className={className} id={id}>
        {cellRender ?? FormatNumber({
          value: value,
          empty: 0,
        }).slice(0, -getVolumeFractionSizeFormat(volumeUnit))}
      </td>
    );
  }
  return (
    <td className={className} id={id}>
      {cellRender ?? FormatNumber({
        value: value,
        fractionSize: 2,
        empty: 0,
        key: 'short',
        translateFunc: () => '',
      })}
    </td>
  );
});

export default memo(PriceboardCell);