import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useSafeState from "../../hooks/useSafeState";
import type { IGetSymbolsResponse, ISymbol, ISymbolData } from "../../interface/symbolRequest";
import IndexGroup from "./index-group";
import IndexTable from "./index-table";

const OverviewIndex = () => {
    const [indexSymbols, setIndexSymbols] = useSafeState<ISymbolData[]>([]);

    const { isPending, error, data, isFetching, isSuccess } = useQuery<ISymbol[]>({
        queryKey: ['symbol-aggregations'],
        queryFn: async () => {
            const response = await fetch('https://api.finpath.vn/api/symbolaggregations/symbols')
            const _res = await response.json() as IGetSymbolsResponse
            return _res.data.symbols;
        },
    });

    useEffect(() => {
        if (isSuccess && !!data.length) {
            const listIndex = data.filter((symbol) => symbol.symbolType === "index").sort((a, b) => b.data.price - a.data.price);
            setIndexSymbols(listIndex.map(x => x.data));
        }
    }, [data, isSuccess]);

    return (
        <div className="flex justify-between gap-4 px-3 pt-2 overflow-hidden text-caption text-light-default dark:text-dark-default !h-[179px]">
            <div className="flex gap-2.5 overflow-x-auto snap-x mac-scrollbar">
                {indexSymbols.map((item, index) => <IndexGroup index={item} key={index} />)}
            </div>
            <div className="hidden overflow-x-auto snap-x mac-scrollbar lg:block min-w-fit">
                <IndexTable indexSymbols={indexSymbols} />
            </div>
        </div>
    )
}

export default OverviewIndex;
