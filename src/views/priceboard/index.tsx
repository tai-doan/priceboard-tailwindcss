import OverviewIndex from "../overview-index";
import Priceboard from "./priceboard";

const PriceboardLayout = () => {
    return (
        <div className="h-full space-y-4 overflow-hidden bg-v3-bg-light-1 dark:bg-v3-bg-dark-1">
            <OverviewIndex />
            <Priceboard />
        </div>
    )
}

export default PriceboardLayout;