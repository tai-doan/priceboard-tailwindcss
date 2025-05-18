import type { FC } from "react";

interface BodyProps {
    children: React.ReactNode;
}

const Body: FC<BodyProps> = ({ children }) => {
    return (
        <div
            className="relative flex mt-1 text-v3-text-light-default dark:text-v3-text-dark-default"
            style={{ height: "calc(-48px + 100vh)" }}
        >
            {children}
        </div>
    );
}

export default Body;