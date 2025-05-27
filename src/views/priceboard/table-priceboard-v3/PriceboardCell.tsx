import React, { useEffect } from "react";
import usePrevious from "../../../hooks/usePrevious";
import FormatNumber from "../../../utils/formater/FormatNumber";

const changeBackground = (id: string, newValue: string | number, oldValue: string | number, compare: 'ref' | 'neutral') => {
  const elemm = document.getElementById(id)
  if (!elemm) return;
  // if (Number.parseInt(newValue) === Number.parseInt(oldValue)) return
  if (compare === 'neutral') {
    if (elemm.classList.contains('!bg-neutral')) {
      return
    }
    elemm.classList.add('!bg-neutral')
    setTimeout(() => {
      elemm.classList.remove('!bg-neutral')
    }, 600)
    return;
  }
  if (Number(newValue) < Number(oldValue)) {
    if (elemm.classList.contains('!bg-price-down')) {
      return
    }
    // Remove thẻ up (nếu có)
    elemm.classList.remove('!bg-price-up')
    elemm.classList.add('!text-white', '!bg-price-down')
    setTimeout(() => {
      elemm.classList.remove('!text-white', '!bg-price-down')
    }, 600)
    return
  } else if (Number(newValue) > Number(oldValue)) {
    if (elemm.classList.contains('!bg-price-up')) {
      return
    }
    // Remove thẻ down (nếu có)
    elemm.classList.remove('!bg-price-down')
    elemm.classList.add('!text-white', '!bg-price-up')
    setTimeout(() => {
      elemm.classList.remove('!text-white', '!bg-price-up')
    }, 600)
    return
  }
}

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
        })}
      </td>
      // <td className={className} id={id}>
      //   {cellRender ?? value}
      // </td>
    );
  }
  return (
    <td className={className} id={id}>
      {cellRender ?? FormatNumber({
        value: value,
        fractionSize: 2,
        empty: 0,
      })}
    </td>
  );
});

export default PriceboardCell;