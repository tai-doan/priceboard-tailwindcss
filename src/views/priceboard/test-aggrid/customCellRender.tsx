import type { ICellRendererParams } from "ag-grid-community";
import { memo, useEffect } from "react";
import usePrevious from "../../../hooks/usePrevious";

export const CustomCellRender = memo((params: ICellRendererParams) => {
    const prevValue = usePrevious(params.value);
    useEffect(() => {
        if (prevValue && params.value && prevValue !== params.value && !!params.value) {
            changeBackground(params.eGridCell, params.value, prevValue, 'ref')
        }
    }, [params.value, params.column?.getColId()]);

    return <span>{params.valueFormatted ?? params.value} {params.column?.getColId() === 'ch_percent' ? '%' : null}</span>
}, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value
        && prevProps.valueFormatted === nextProps.valueFormatted
        && prevProps.column?.getColId() === nextProps.column?.getColId()
});

export const CustomNeutralCellRender = memo((params: ICellRendererParams) => {
    const prevValue = usePrevious(params.value);

    useEffect(() => {
        if (prevValue && params.value && prevValue !== params.value && !!params.value) {
            changeBackground(params.eGridCell, params.value, prevValue, 'neutral')
        }
    }, [params.value, params.column?.getColId()]);

    return <span>{params.valueFormatted ?? params.value}</span>
}, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value
        && prevProps.valueFormatted === nextProps.valueFormatted
        && prevProps.column?.getColId() === nextProps.column?.getColId()
});

const changeBackground = (elemm: HTMLElement, newValue: string | number, oldValue: string | number, compare: 'ref' | 'neutral') => {
    if (!elemm) return;
    if (compare === 'neutral') {
        if (elemm.classList.contains('bg-neutral')) {
            return
        }
        elemm.classList.add('dark:bg-dark-neutral', 'bg-neutral',)
        setTimeout(() => {
            elemm.classList.remove('dark:bg-dark-neutral', 'bg-neutral',)
        }, 600)
        return;
    }
    if (Number(newValue) < Number(oldValue)) {
        if (elemm.classList.contains('!bg-price-down')) {
            return
        }
        // Remove thẻ up (nếu có)
        elemm.classList.remove('!text-white', '!bg-price-up')
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
        elemm.classList.remove('!text-white', '!bg-price-down')
        elemm.classList.add('!text-white', '!bg-price-up')
        setTimeout(() => {
            elemm.classList.remove('!text-white', '!bg-price-up')
        }, 600)
        return
    }
}

