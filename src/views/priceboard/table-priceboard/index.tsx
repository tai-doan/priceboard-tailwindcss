import { useEffect, useState } from "react";
import BodyTablePriceboard from "./body-table-priceboard";
import HeaderTablePriceboard from "./header-table-priceboard";

const TablePriceboard = ({ indexCd = '' }: { indexCd: string }) => {
    const [tableHeight, setTableHeight] = useState(500);

    useEffect(() => {
        const handleResize = () => {
            const { top } = document.getElementById("table-priceboard")!.getBoundingClientRect();
            const { height } = document.getElementById("priceboard-layout")!.getBoundingClientRect();

            if (!!height && !!top) {
                setTableHeight(height - top + 28);
            }
        }
        handleResize();
        document.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("resize", handleResize);
        }
    }, [])

    return (
        <div className="relative overflow-auto mac-scrollbar" style={{ height: tableHeight }}>
            <table id="table-priceboard" className="w-full border-separate border-spacing-0" style={{
                tableLayout: "fixed",
                marginBottom: 0,
                marginTop: 0,
            }}>
                <HeaderTablePriceboard />
                <BodyTablePriceboard indexCd={indexCd} />
            </table>
        </div>
    )
}

export default TablePriceboard;
