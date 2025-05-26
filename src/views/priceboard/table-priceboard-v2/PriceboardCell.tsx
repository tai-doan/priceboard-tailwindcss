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
    elemm.classList.add('!bg-price-down')
    elemm.classList.add('!text-white')
    setTimeout(() => {
      elemm.classList.remove('!bg-price-down')
      elemm.classList.remove('!text-white')
    }, 600)
    return
  } else if (Number(newValue) > Number(oldValue)) {
    if (elemm.classList.contains('!bg-price-up')) {
      return
    }
    elemm.classList.add('!bg-price-up')
    elemm.classList.add('!text-white')
    setTimeout(() => {
      elemm.classList.remove('!bg-price-up')
      elemm.classList.remove('!text-white')
    }, 600)
    return
  }
}

const PriceboardCell = React.memo((
  {
    value,
    id,
    className,
    type = 'price',
    cellRender,
  }: {
    value: string | number,
    id: string,
    className: string,
    type?: 'price' | 'volume' | 'normal',
    cellRender?: any,
  }
) => {
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (id)
      if (prevValue && value && prevValue !== value && !!value) {
        changeBackground(id, value, prevValue, type === 'price' ? 'ref' : 'neutral')
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