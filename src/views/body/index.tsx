import type { FC } from "react";

interface BodyProps {
    children: React.ReactNode;
}

const Body: FC<BodyProps> = ({ children }) => {
    return (
        <div
            className="relative flex mt-1 text-light-default dark:text-dark-default"
            style={{ height: "calc(100vh - 52px)" }}
        >
            {children}
        </div>
    );
}

export default Body;