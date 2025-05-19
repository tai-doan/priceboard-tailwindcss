import OverviewIndex from "../overview-index";
import Priceboard from "./priceboard";

const PriceboardLayout = () => {
    return (
        <div className="h-full space-y-4 overflow-hidden bg-light-1 dark:bg-dark-1">
            <OverviewIndex />
            <Priceboard />
        </div>
    )
}

export default PriceboardLayout;